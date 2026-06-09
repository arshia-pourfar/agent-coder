import { Tool } from "./tool.interface";

export class ListFilesTool implements Tool {
    name = "listFiles" as const;

    description =
        "List files in directory";

    async execute(
        parameters: Record<string, unknown>
    ): Promise<string> {

        const path =
            parameters.path as string;

        return "TODO";
    }
}




import fs from "fs/promises";
// import path from "path";

// import { Tool } from "./tool.interface";
// import { WorkspaceManager } from "../workspace/workspaceManager";

// export class ListFilesTool implements Tool {
//     name = "listFiles" as const;

//     description = "List files in directory";

//     constructor(
//         private workspace: WorkspaceManager
//     ) { }

//     async execute(
//         parameters: Record<string, unknown>
//     ): Promise<string> {

//         const relativePath =
//             (parameters.path as string) || ".";

//         const dirPath = path.join(
//             this.workspace.getRoot(),
//             relativePath
//         );

//         const items = await fs.readdir(dirPath, {
//             withFileTypes: true
//         });

//         return items
//             .map(item =>
//                 item.isDirectory()
//                     ? `[DIR] ${item.name}`
//                     : `[FILE] ${item.name}`
//             )
//             .join("\n");
//     }
// }