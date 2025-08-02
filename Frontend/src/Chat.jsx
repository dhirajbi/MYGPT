import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { Mycontext } from "./Mycontex";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(Mycontext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply == null) {
      setLatestReply(null);
      return;
    }
    if (!prevChats?.length ) return;

    const content = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}
      <div className="chats">
        {prevChats?.slice(0,-1).map((chat, idx) => (
          <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <div className="gptMessage">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}

        {
          prevChats.length > 0 && (
            <>
              {
                latestReply === null ? (
                    <div className="gptDiv" key={"typing"}>
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                    </div>
                ):(
                <div className="gptDiv" key={"typing"}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                  </div>
                ) 
              }
            
            </>
          )
        }
        
      </div>
    </>
  );
}

export default Chat;
