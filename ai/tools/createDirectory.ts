import fs from "fs/promises";
import path from "path";

import { Tool } from "./tool.interface";
import { WORKSPACE_ROOT } from "../config";

export class CreateDirectoryTool
    implements Tool {

    name = "createDirectory" as const;

    description =
        "Create a directory";

    async execute(
        parameters: Record<string, unknown>
    ): Promise<string> {

        const relativePath =
            parameters.path as string;

        const directoryPath =
            path.join(
                WORKSPACE_ROOT,
                relativePath
            );

        await fs.mkdir(
            directoryPath,
            { recursive: true }
        );

        return `
Directory created

Path:
${directoryPath}
        `.trim();
    }
}