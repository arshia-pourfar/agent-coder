import { ToolRegistry } from "./tools/toolRegistry";
import { validateToolCall } from "./tools/validateToolCall";
import { LLMRouter } from "./providers/router";
import { MemoryStore } from "./memory/memoryStore";
import type { ToolName } from "./tools/schema";
import { ReadFileTool } from "./tools/readFile";
import { WriteFileTool } from "./tools/writeFile";
import { SearchFilesTool } from "./tools/searchFiles";
import { RunTerminalTool } from "./tools/runTerminal";
import { ListFilesTool } from "./tools/listFiles";

export type AgentState =
    | "idle"
    | "planning"
    | "executing"
    | "observing"
    | "error";

export interface AgentMemoryItem {
    input: string;
    output: string;
    tool?: ToolName | "llm";
}

type AgentAction =
    | { type: "tool"; tool: ToolName; args: any[] }
    | { type: "final"; output: string };

export class AgentEngine {
    public state: AgentState = "idle";

    private memory = new MemoryStore();
    private tools = new ToolRegistry();

    private llm = LLMRouter.get(
        (process.env.LLM_PROVIDER as "ollama" | "openai") || "ollama"
    );

    constructor() {
        this.registerTools();
    }

    private registerTools() {
        this.tools.register(new ReadFileTool());
        this.tools.register(new WriteFileTool());
        this.tools.register(new SearchFilesTool());
        this.tools.register(new RunTerminalTool());
        this.tools.register(new ListFilesTool());
    }
    private async callTool(toolCall: AgentAction & { type: "tool" }): Promise<string> {
        const tool = this.tools.get(toolCall.tool);

        if (!tool) {
            throw new Error(`Tool not found: ${toolCall.tool}`);
        }

        const output = await tool.execute(...toolCall.args);

        this.memory.add({
            input: toolCall.tool,
            output,
            tool: toolCall.tool
        });

        return output;
    }

    private buildPrompt(userInput: string) {
        return `
You are an AI coding agent.

You must respond ONLY in JSON.

Either:

1) Tool call:
{
  "type": "tool",
  "tool": "readFile | writeFile | searchFiles | runTerminal | listFiles",
  "args": []
}

2) Final answer:
{
  "type": "final",
  "output": "string"
}

User request:
${userInput}
        `.trim();
    }

    private async llmStep(prompt: string): Promise<AgentAction> {
        const response = await this.llm.chat([
            { role: "system", content: this.buildPrompt(prompt) },
            { role: "user", content: prompt }
        ]);

        try {
            return JSON.parse(response) as AgentAction;
        } catch {
            throw new Error(`Invalid LLM JSON output: ${response}`);
        }
    }

    public async handlePrompt(prompt: string): Promise<string> {
        this.state = "planning";

        let context = prompt;
        let finalResult = "";

        for (let step = 0; step < 3; step++) {
            try {
                const action = await this.llmStep(context);

                this.state = "executing";

                if (action.type === "final") {
                    finalResult = action.output;
                    break;
                }

                const result = await this.callTool(action);

                this.state = "observing";

                this.memory.add({
                    input: prompt,
                    output: result,
                    tool: action.tool
                });

                finalResult = result;

                context = `
Previous result:
${result}

Original request:
${prompt}
                `.trim();

            } catch (err: any) {
                this.state = "error";
                return `Error: ${err.message}`;
            }
        }

        this.state = "idle";
        return finalResult;
    }
}