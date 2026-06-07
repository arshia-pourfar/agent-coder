import { writeFile as fsWrite } from "fs/promises";

export class WriteFileTool {
    name = "writeFile";

    async execute(path: string, content: string): Promise<string> {
        await fsWrite(path, content);
        return "file written";
    }
}