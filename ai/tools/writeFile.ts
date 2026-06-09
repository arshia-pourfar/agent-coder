import fs from "fs/promises";
import path from "path";

import { Tool } from "./tool.interface";
import { WORKSPACE_ROOT } from "../config";

export class WriteFileTool implements Tool {
    name = "writeFile" as const;

    description =
        "Create or overwrite a file";

    async execute(
        parameters: Record<string, unknown>
    ): Promise<string> {

        const relativePath =
            parameters.path as string;

        const content =
            parameters.content as string;

        if (!relativePath) {
            throw new Error(
                "Missing parameter: path"
            );
        }

        const filePath = path.join(
            WORKSPACE_ROOT,
            relativePath
        );

        const directory = path.dirname(
            filePath
        );

        await fs.mkdir(
            directory,
            { recursive: true }
        );

        await fs.writeFile(
            filePath,
            content ?? "",
            "utf8"
        );

        return `
File created successfully

Path:
${filePath}
        `.trim();
    }
}





// import fs from "fs/promises";
// import path from "path";

// import { Tool } from "./tool.interface";
// import { WorkspaceManager } from "../workspace/workspaceManager";

// export class WriteFileTool implements Tool {

//     name = "writeFile" as const;

//     description =
//         "Create or overwrite a file";

//     constructor(
//         private workspace: WorkspaceManager
//     ) { }

//     async execute(
//         parameters: Record<string, unknown>
//     ): Promise<string> {

//         const relativePath =
//             parameters.path as string;

//         const content =
//             parameters.content as string;

//         if (!relativePath) {
//             throw new Error(
//                 "Missing parameter: path"
//             );
//         }

//         const filePath = path.join(
//             this.workspace.getRoot(),
//             relativePath
//         );

//         await fs.mkdir(
//             path.dirname(filePath),
//             {
//                 recursive: true
//             }
//         );

//         await fs.writeFile(
//             filePath,
//             content ?? "",
//             "utf8"
//         );

//         return `
// File created successfully

// Path:
// ${filePath}
//         `.trim();
//     }
// }