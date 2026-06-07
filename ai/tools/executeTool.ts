import { ToolCall } from "./schema";
import { ToolRegistry } from "./toolRegistry";

export async function executeTool(
    call: ToolCall,
    registry: ToolRegistry
): Promise<string> {
    const tool = registry.get(call.tool);

    const result = await tool.execute(...call.args);

    if (Array.isArray(result)) {
        return result.join("\n");
    }

    return String(result);
}