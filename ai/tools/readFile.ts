import { readFile as fsRead } from "fs/promises";

export class ReadFileTool {
    name = "readFile";

    async execute(path: string): Promise<string> {
        return await fsRead(path, "utf-8");
    }
}