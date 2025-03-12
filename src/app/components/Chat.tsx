"use client";
import { useState, useEffect, useRef } from "react";
import "primeflex/primeflex.css";
import { fetchDb } from "../functions/fetch";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface Message {
  content: string;
  role: string;
}

export default function Chat({
  score,
  setScore,
}: {
  score: number;
  setScore: (score: number) => void;
}) {
  const t = useTranslations("Chat");
  const { sid } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const [scoreHistory, setScoreHistory] = useState<number[]>([]);
  const [system, setSystem] = useState<string>("");
  const [challengeDescription, setChallengeDescription] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isWin, setIsWin] = useState<boolean>(false);

  // send message
  const sendMessage = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!input.trim()) return; // 如果输入为空则返回
    const newMessage = { role: "user", content: input }; // 添加用户新消息
    setInput(""); // 清空用户输入
    setMessages([...messages, newMessage]); // 添加用户新消息到messages

    const requestBody = {
      model: "gemini-2.0-flash-exp",
      messages: [...messages, newMessage],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "compliance_result",
          schema: {
            type: "object",
            properties: {
              text: {
                type: "string",
                description: "Response text.",
              },
              score: {
                type: "number",
                description: "Score of the response.",
              },
            },
            required: ["text", "score"],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    };

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      }
    );
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    const jsonObj = JSON.parse(aiResponse);
    const curScore = jsonObj.score;
    setScore(score + curScore);
    setScoreHistory([...scoreHistory, curScore]);
    setMessages([
      ...messages,
      newMessage, // 添加用户新消息
      { role: "assistant", content: jsonObj.text },
    ]); // 添加助手新消息
  };

  // handle enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // fetch challenge data
  useEffect(() => {
    const fetchChallenge = async () => {
      if (!sid) return;

      const validSid = Array.isArray(sid) ? sid[0] : sid;
      const scenarioData = await fetchDb(validSid);
      setSystem(scenarioData.system);
      // console.log(scenarioData.system);
      setMessages([
        {
          role: "system",
          content:
            system +
            " DO NOT INCLUDE THE SCORE IN THE TEXT, reply with the same language as user input.",
        },
        { role: "assistant", content: scenarioData.start },
      ]);
    };
    fetchChallenge();
  }, [sid, system]);

  // page scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-1 flex-column h-screen bg-gray-50">
      <div
        className="flex-1 w-full max-w-4xl mx-auto pb-4 overflow-auto"
        ref={scrollRef}
      >
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, index) => (
            <div key={index} className="mb-2 p-2">
              <strong>
                {msg.role == "assistant" ? t("role_assistant") : t("role_user")}
                :
              </strong>{" "}
              {msg.content}
            </div>
          ))}
      </div>

      <div className="bg-white border-top-1 surface-border py-3 z-2">
        <div className="max-w-4xl mx-auto px-4 flex gap-3">
          <textarea
            placeholder={t("placeholder")}
            className="flex-1 min-h-4rem max-h-8rem p-3 border-1 border-round surface-border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button
            onClick={sendMessage}
            className="px-6 py-2 bg-primary text-white border-round hover:bg-primary-dark transition-colors duration-200 flex align-items-center justify-content-center"
          >
            {t("send")}
          </button>
        </div>
      </div>
    </div>
  );
}
