import { Tool } from "./tool.interface";
import { ToolName } from "./schema";

export class ToolRegistry {
    private tools = new Map<
        ToolName,
        Tool
    >();

    register(tool: Tool) {
        this.tools.set(tool.name, tool);
    }

    get(
        name: ToolName
    ): Tool | undefined {
        return this.tools.get(name);
    }

    list() {
        return [...this.tools.values()];
    }
}