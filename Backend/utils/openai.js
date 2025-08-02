import 'dotenv/config';

const getOpenAPIResponse = async (message) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'user',
        content: message || 'Hello'
      }]
    })
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', options);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

export default getOpenAPIResponse;
