export type ToolName =
    | "readFile"
    | "writeFile"
    | "searchFiles"
    | "listFiles"
    | "runTerminal"
    | "createDirectory"
    | "deleteFile"
    | "renameFile"
    | "gitDiff"
    | "gitCommit";

export interface ToolCall {
    tool: ToolName;
    parameters: Record<string, unknown>;
}

export interface ToolResult {
    tool: ToolName;
    output: string;
}