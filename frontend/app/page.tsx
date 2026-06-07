"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatPanel, { Message } from "../components/ChatPanel";
import AgentPanel from "../components/AgentPanel";

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [agentState] =
    useState<"idle" | "planning" | "executing" | "observing">("idle");

  return (
    <div className="flex w-full h-full">
      <Sidebar />

      <div className="flex flex-1">
        <ChatPanel messages={messages} setMessages={setMessages} />
        <AgentPanel state={agentState} />
      </div>
    </div>
  );
}