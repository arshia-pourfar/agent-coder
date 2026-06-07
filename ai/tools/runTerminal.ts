export class RunTerminalTool {
    name = "runTerminal";

    async execute(command: string): Promise<string> {
        // فعلاً mock یا واقعی
        return `executed: ${command}`;
    }
}