"use client";

import { useState } from "react";
import fetchAgent from "../lib/fetchAgent";

export type MessageRole = "user" | "agent";

export interface Message {
    role: MessageRole;
    content: string;
}

interface ChatPanelProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatPanel({
    messages,
    setMessages,
}: ChatPanelProps) {
    const [input, setInput] = useState<string>("");

    const send = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMsg]);

        const response = await fetchAgent(input);

        const agentMsg: Message = {
            role: "agent",
            content: response,
        };

        setMessages((prev) => [...prev, agentMsg]);
        setInput("");
    };

    return (
        <div className="flex flex-col flex-1 bg-app">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-lg max-w-xl ${m.role === "user"
                            ? "ml-auto bg-primary text-white"
                            : "bg-panel"
                            }`}
                    >
                        {m.content}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-app bg-panel">
                <div className="flex gap-2">
                    <textarea
                        className="input flex-1 p-3 rounded resize-none h-12"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask the agent..."
                    />
                    <button onClick={send} className="btn-primary px-4 rounded">
                        Run
                    </button>
                </div>
            </div>
        </div>
    );
}