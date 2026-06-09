import { ToolRegistry } from "./tools/toolRegistry";
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
    | {
        type: "tool";
        tool: ToolName;
        parameters: Record<string, unknown>;
    }
    | {
        type: "final";
        output: string;
    };

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

    // -----------------------------
    // TOOL EXECUTION
    // -----------------------------
    private async callTool(
        action: Extract<AgentAction, { type: "tool" }>
    ): Promise<string> {

        const tool = this.tools.get(action.tool);

        if (!tool) {
            throw new Error(`Tool not found: ${action.tool}`);
        }

        const output = await tool.execute(action.parameters);

        this.memory.add({
            input: action.tool,
            output,
            tool: action.tool
        });

        return output;
    }

    // -----------------------------
    // MEMORY CONTEXT
    // -----------------------------
    private getMemoryContext(): string {
        const last = this.memory.getLast(5);

        return last
            .map(m => `Tool: ${m.tool}\nResult: ${m.output}`)
            .join("\n---\n");
    }

    // -----------------------------
    // PROMPT
    // -----------------------------
    private buildPrompt(userInput: string): string {
        return `
You are a STRICT JSON coding agent.

RULES:
- Output ONLY JSON (no text, no markdown)
- You are NOT allowed to explain anything
- You are NOT allowed to output code outside JSON
- You must either CALL A TOOL or RETURN FINAL RESULT

TOOLS:
readFile, writeFile, searchFiles, listFiles, runTerminal

FORMAT:

Tool call:
{
  "type": "tool",
  "tool": "writeFile",
  "parameters": {
    "path": "file.py",
    "content": "print('hello')"
  }
}

Final:
{
  "type": "final",
  "output": "Done"
}

Memory:
${this.getMemoryContext()}

User:
${userInput}
`.trim();
    }

    // -----------------------------
    // JSON EXTRACTION (IMPORTANT FIX)
    // -----------------------------
    private extractJSON(text: string): AgentAction {
        const match = text.match(/\{[\s\S]*\}/);

        if (!match) {
            throw new Error("No JSON found in LLM output");
        }

        return JSON.parse(match[0]);
    }

    // -----------------------------
    // LLM STEP (WITH RETRY)
    // -----------------------------
    private async llmStep(prompt: string, retry = 0): Promise<AgentAction> {

        const response = await this.llm.chat([
            {
                role: "system",
                content: this.buildPrompt(prompt)
            },
            {
                role: "user",
                content: prompt
            }
        ]);

        let cleaned = response.trim();

        try {
            return this.extractJSON(cleaned);
        } catch (err) {

            if (retry < 1) {
                return this.llmStep(
                    "Return ONLY valid JSON. No text. Fix this:\n" + response,
                    retry + 1
                );
            }

            throw new Error(`Invalid LLM output: ${response}`);
        }
    }

    // -----------------------------
    // MAIN LOOP
    // -----------------------------
    public async handlePrompt(prompt: string): Promise<string> {

        this.state = "planning";

        let context = prompt;
        let finalResult = "";

        for (let step = 0; step < 5; step++) {

            try {
                const action = await this.llmStep(context);

                if (action.type === "final") {
                    this.state = "idle";
                    return action.output;
                }

                this.state = "executing";

                const result = await this.callTool(action);

                this.state = "observing";

                finalResult = result;

                context = `
Tool executed: ${action.tool}

Result:
${result}

If task is complete return FINAL JSON.
Otherwise continue.
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



// import { ToolRegistry } from "./tools/toolRegistry";
// import { LLMRouter } from "./providers/router";
// import { MemoryStore } from "./memory/memoryStore";
// import { WorkspaceManager } from "./workspace/workspaceManager";

// import type { ToolName } from "./tools/schema";

// import { ReadFileTool } from "./tools/readFile";
// import { WriteFileTool } from "./tools/writeFile";
// import { SearchFilesTool } from "./tools/searchFiles";
// import { RunTerminalTool } from "./tools/runTerminal";
// import { ListFilesTool } from "./tools/listFiles";

// export type AgentState =
//     | "idle"
//     | "planning"
//     | "executing"
//     | "observing"
//     | "error";

// export interface AgentMemoryItem {
//     input: string;
//     output: string;
//     tool?: ToolName | "llm";
// }

// type AgentAction =
//     | {
//         type: "tool";
//         tool: ToolName;
//         parameters: Record<string, unknown>;
//     }
//     | {
//         type: "final";
//         output: string;
//     };

// export class AgentEngine {
//     public state: AgentState = "idle";

//     private memory = new MemoryStore();

//     private tools = new ToolRegistry();

//     private workspace: WorkspaceManager;

//     private llm = LLMRouter.get(
//         (process.env.LLM_PROVIDER as "ollama" | "openai") || "ollama"
//     );

//     constructor(workspaceRoot: string) {
//         this.workspace = new WorkspaceManager(workspaceRoot);

//         this.registerTools();
//     }

//     private registerTools() {
//         this.tools.register(
//             new ReadFileTool(this.workspace)
//         );

//         this.tools.register(
//             new WriteFileTool(this.workspace)
//         );

//         this.tools.register(
//             new SearchFilesTool(this.workspace)
//         );

//         this.tools.register(
//             new RunTerminalTool(this.workspace)
//         );

//         this.tools.register(
//             new ListFilesTool(this.workspace)
//         );
//     }

//     private async callTool(
//         action: Extract<AgentAction, { type: "tool" }>
//     ): Promise<string> {

//         const tool = this.tools.get(action.tool);

//         if (!tool) {
//             throw new Error(
//                 `Tool not found: ${action.tool}`
//             );
//         }

//         const output = await tool.execute(
//             action.parameters
//         );

//         this.memory.add({
//             input: action.tool,
//             output,
//             tool: action.tool
//         });

//         return output;
//     }

//     private buildPrompt(userInput: string): string {
//         return `
// You are an AI coding agent.

// IMPORTANT:

// Return ONLY valid JSON.

// Never use markdown.

// Never use \`\`\`.

// Never use absolute paths.

// Allowed:

// src/app.ts
// README.md
// frontend/app/page.tsx
// backend/src/server.ts

// Tool format:

// {
//   "type":"tool",
//   "tool":"writeFile",
//   "parameters":{
//      "path":"test.py",
//      "content":"print('hello')"
//   }
// }

// Final format:

// {
//   "type":"final",
//   "output":"Done"
// }

// User request:

// ${userInput}
// `.trim();
//     }

//     private async llmStep(
//         prompt: string
//     ): Promise<AgentAction> {

//         const response = await this.llm.chat([
//             {
//                 role: "system",
//                 content: this.buildPrompt(prompt)
//             },
//             {
//                 role: "user",
//                 content: prompt
//             }
//         ]);

//         let cleaned = response.trim();

//         cleaned = cleaned
//             .replace(/^```json/i, "")
//             .replace(/^```/i, "")
//             .replace(/```$/i, "")
//             .trim();

//         try {
//             return JSON.parse(cleaned) as AgentAction;
//         } catch {
//             throw new Error(
//                 `Invalid LLM JSON output: ${response}`
//             );
//         }
//     }

//     public async handlePrompt(
//         prompt: string
//     ): Promise<string> {

//         this.state = "planning";

//         let context = prompt;

//         let finalResult = "";

//         for (let step = 0; step < 5; step++) {

//             try {

//                 const action =
//                     await this.llmStep(context);

//                 if (action.type === "final") {

//                     this.state = "idle";

//                     return action.output;
//                 }

//                 this.state = "executing";

//                 const result =
//                     await this.callTool(action);

//                 this.state = "observing";

//                 finalResult = result;

//                 context = `
// Tool executed:

// ${action.tool}

// Result:

// ${result}

// Original request:

// ${prompt}

// If finished:

// {
//   "type":"final",
//   "output":"Done"
// }
//                 `.trim();

//             } catch (error: any) {

//                 this.state = "error";

//                 return `Error: ${error.message}`;
//             }
//         }

//         this.state = "idle";

//         return finalResult;
//     }
// }