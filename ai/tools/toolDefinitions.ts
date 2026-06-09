import { ToolName } from "./schema";

export interface ToolDefinition {
    name: ToolName;

    description: string;

    parameters: {
        name: string;
        type: string;
        required: boolean;
    }[];
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
    {
        name: "readFile",
        description: "Read file content",
        parameters: [
            {
                name: "path",
                type: "string",
                required: true
            }
        ]
    },

    {
        name: "writeFile",
        description: "Create or overwrite a file",
        parameters: [
            {
                name: "path",
                type: "string",
                required: true
            },
            {
                name: "content",
                type: "string",
                required: true
            }
        ]
    },

    {
        name: "searchFiles",
        description: "Search files by keyword",
        parameters: [
            {
                name: "query",
                type: "string",
                required: true
            }
        ]
    },

    {
        name: "listFiles",
        description: "List directory files",
        parameters: [
            {
                name: "path",
                type: "string",
                required: true
            }
        ]
    },

    {
        name: "runTerminal",
        description: "Execute terminal command",
        parameters: [
            {
                name: "command",
                type: "string",
                required: true
            }
        ]
    }
];