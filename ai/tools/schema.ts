export type ToolName =
    | "readFile"
    | "writeFile"
    | "searchFiles"
    | "runTerminal"
    | "listFiles";

export interface ToolCall {
    tool: ToolName;
    args: any[];
}

export interface ToolResult {
    tool: ToolName;
    output: string;
}