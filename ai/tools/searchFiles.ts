export class SearchFilesTool {
    name = "searchFiles";

    async execute(query: string): Promise<string> {
        const results = ["file1.ts", "file2.ts"]; // mock
        return results.join("\n");
    }
}