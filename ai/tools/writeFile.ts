import fs from "fs/promises";
import { Tool } from "./tool.interface";

export class WriteFileTool implements Tool {
    name = "writeFile" as const;

    description =
        "Create or overwrite a file";

    async execute(
        parameters: Record<string, unknown>
    ): Promise<string> {
        const path = parameters.path as string;
        const content = parameters.content as string;

        await fs.writeFile(path, content);

        return `File written: ${path}`;
    }
}