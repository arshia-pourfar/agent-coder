
export const TOOL_DEFINITIONS = [
    {
        name: "readFile",
        description: "Read file content",
        parameters: {
            path: "string"
        }
    },

    {
        name: "writeFile",
        description: "Create or overwrite a file",
        parameters: {
            path: "string",
            content: "string"
        }
    },

    {
        name: "searchFiles",
        description: "Search project files",
        parameters: {
            query: "string"
        }
    },

    {
        name: "listFiles",
        description: "List directory files",
        parameters: {
            path: "string"
        }
    },

    {
        name: "runTerminal",
        description: "Execute terminal command",
        parameters: {
            command: "string"
        }
    },

    {
        name: "createDirectory",
        description: "Create directory",
        parameters: {
            path: "string"
        }
    },

    {
        name: "deleteFile",
        description: "Delete file",
        parameters: {
            path: "string"
        }
    },

    {
        name: "renameFile",
        description: "Rename file",
        parameters: {
            oldPath: "string",
            newPath: "string"
        }
    },

    {
        name: "gitDiff",
        description: "Show git diff",
        parameters: {}
    },

    {
        name: "gitCommit",
        description: "Commit git changes",
        parameters: {
            message: "string"
        }
    }
];