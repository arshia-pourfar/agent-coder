import { NextRequest, NextResponse } from "next/server";
import { AgentEngine } from "../../../../ai/agentEngine";

const agent = new AgentEngine();

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        const response = await agent.handlePrompt(prompt);
        return NextResponse.json({ response });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ response: "Agent error" }, { status: 500 });
    }
}