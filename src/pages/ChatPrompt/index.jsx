import React, { useRef, useState, useEffect } from "react";
import { Input, Button } from "antd";
import axios from "axios";
import { Spin } from "antd";

import {
  ChatPromptWindowStyled,
  PromptBar,
} from "../../styles/pages/ChatPromptWindow";

import Logo from "../../assets/images/logo-min.png";
import UserIcon from "../../assets/images/profile-logo.png";

import { useSelector } from "react-redux";

export default function ChatPrompt() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [, setIsTyping] = useState(false);


  const firstname = useSelector((state) => state.user.firstname);
  const submissionId = useSelector((state) => state.progressSubmission.submissionId);
  const chatBodyRef = useRef(null);
  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;

    setMessages(prev => [...prev, { type: "right", text: prompt }]);
    const userPrompt = prompt;
    setPrompt("");

    // show typing bubble
    setIsTyping(true);
    setMessages(prev => [
      ...prev,
      { type: "left", text: "...typing", temp: true }
    ]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AI_QUERY}/chatbox/query`,
        { question: userPrompt ,
          submission_id:submissionId,
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      const botReply = response.data?.answer || "No response received";

      // remove temp bubble, add real reply
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.temp);
        return [...filtered, { type: "left", text: botReply }];
      });

    } catch (err) {
      console.error("Chatbot fetch failed:", err);

      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.temp);
        return [...filtered, { type: "left", text: "No response from server." }];
      });
    }

    setIsTyping(false);

    setTimeout(() => {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 80);
  };


  useEffect(() => {
    if (!chatBodyRef.current) return;
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messages]);

  return (
    <ChatPromptWindowStyled>
      {messages.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#006172", fontWeight: 700, fontSize: 36, margin: 0 }}>
            Hi {firstname}! Can I help you with something?
          </p>
          <p style={{ color: "#737791", fontSize: 18, marginTop: 10 }}>
            Ready to assist you with anything you need.
          </p>
        </div>
      )}
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, idx) => (
          <div className={`message-row ${msg.type}`} key={idx}>
            {msg.type === "left" && (
              <img src={Logo} alt="bot" className="chat-logo" />
            )}
            <div className={`message-bubble ${msg.type}`}>
              <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                {msg.temp ? (
                  <Spin size="small" />
                ) : (
                  <span style={{
                    textAlign: "left",
                    padding: "16px",
                    borderRadius: "8px",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.2"
                  }}>{msg.text}</span>
                )}
              </div>

            </div>
            {msg.type === "right" && (
              <img src={UserIcon} alt="user" className="chat-logo" />
            )}
          </div>
        ))}
      </div>
      <PromptBar>
        <div className="input-wrapper">
          <Input.TextArea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything you need"
            className="chat-input"
            autoSize={{ minRows: 2, maxRows: 6 }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendPrompt();
              }
            }}
          />

          <Button type="default" className="send-btn" onClick={handleSendPrompt}>
            Send
          </Button>
        </div>
      </PromptBar>
    </ChatPromptWindowStyled>
  );
}
