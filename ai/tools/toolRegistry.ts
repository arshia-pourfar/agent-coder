import { Tool } from "./tool.interface";

export class ToolRegistry {
    private tools = new Map<string, Tool>();

    register(tool: Tool) {
        this.tools.set(tool.name, tool);
    }

    get(name: string): Tool {
        const tool = this.tools.get(name);

        if (!tool) {
            throw new Error(`Tool not found: ${name}`);
        }

        return tool;
    }
}