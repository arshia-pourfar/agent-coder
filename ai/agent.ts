import { AgentEngine } from "./agentEngine";

/**
 * Singleton Agent Engine
 * keeps memory + state alive
 */
const agentEngine = new AgentEngine();

/**
 * Main entry point for frontend/backend
 */
export async function agent(prompt: string): Promise<string> {
    return await agentEngine.handlePrompt(prompt);
}