import fs from "fs";

export class ListFilesTool {
    name = "listFiles";

    async execute(path: string): Promise<string> {
        const files = fs.readdirSync(path || ".");
        return files.join("\n");
    }
}