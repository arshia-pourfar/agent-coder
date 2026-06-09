import { Tool } from "./tool.interface";

export class SearchFilesTool implements Tool {
    name = "searchFiles" as const;

    description = "Search files by keyword";

    async execute(
        parameters: Record<string, unknown>
    ): Promise<string> {

        const query =
            parameters.query as string;

        return "TODO";
    }
}


// import fs from "fs/promises";
// import path from "path";

// import { Tool } from "./tool.interface";
// import { WorkspaceManager } from "../workspace/workspaceManager";

// export class SearchFilesTool implements Tool {
//     name = "searchFiles" as const;

//     description = "Search files by keyword";

//     constructor(
//         private workspace: WorkspaceManager
//     ) { }

//     async execute(
//         parameters: Record<string, unknown>
//     ): Promise<string> {

//         const query =
//             (parameters.query as string)?.toLowerCase();

//         if (!query) {
//             throw new Error("Missing parameter: query");
//         }

//         const root = this.workspace.getRoot();

//         const results: string[] = [];

//         async function walk(dir: string) {
//             const items = await fs.readdir(dir, {
//                 withFileTypes: true
//             });

//             for (const item of items) {
//                 const fullPath = path.join(dir, item.name);

//                 if (item.isDirectory()) {
//                     await walk(fullPath);
//                 } else {
//                     if (item.name.toLowerCase().includes(query)) {
//                         results.push(
//                             path.relative(root, fullPath)
//                         );
//                     }
//                 }
//             }
//         }

//         await walk(root);

//         return results.length
//             ? results.join("\n")
//             : "No files found";
//     }
// }