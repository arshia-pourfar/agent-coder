import fs from "fs/promises";
import path from "path";

import { Tool } from "./tool.interface";
import { WORKSPACE_ROOT } from "../config";

export class ReadFileTool implements Tool {
    name = "readFile" as const;

    description =
        "Read file content";

    async execute(
        parameters: Record<string, unknown>
    ): Promise<string> {

        const relativePath =
            parameters.path as string;

        const filePath = path.join(
            WORKSPACE_ROOT,
            relativePath
        );

        return await fs.readFile(
            filePath,
            "utf8"
        );
    }
}




// import fs from "fs/promises";
// import path from "path";

// import { Tool } from "./tool.interface";
// import { WorkspaceManager } from "../workspace/workspaceManager";

// export class ReadFileTool implements Tool {
//     name = "readFile" as const;

//     description = "Read file content";

//     constructor(
//         private workspace: WorkspaceManager
//     ) { }

//     async execute(
//         parameters: Record<string, unknown>
//     ): Promise<string> {

//         const relativePath =
//             parameters.path as string;

//         if (!relativePath) {
//             throw new Error("Missing parameter: path");
//         }

//         const filePath = path.join(
//             this.workspace.getRoot(),
//             relativePath
//         );

//         return await fs.readFile(filePath, "utf8");
//     }
// }