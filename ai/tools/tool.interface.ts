import { ToolName } from "./schema";

export interface Tool {
    name: ToolName;

    description: string;

    execute(
        parameters: Record<string, unknown>
    ): Promise<string>;
}