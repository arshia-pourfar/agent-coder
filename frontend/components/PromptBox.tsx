"use client";
import { useState } from "react";
import fetchAgent from "../lib/fetchAgent";

interface Props {
    setResponse: (res: string) => void;
}

export default function PromptBox({ setResponse }: Props) {
    const [prompt, setPrompt] = useState("");

    const handleSubmit = async () => {
        if (!prompt.trim()) return;
        const res = await fetchAgent(prompt);
        setResponse(res);
        setPrompt("");
    };

    return (
        <div className="flex flex-col gap-2">
            <textarea
                className="border p-2 rounded w-full h-32"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your command or question..."
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={handleSubmit}
            >
                Send
            </button>
        </div>
    );
}