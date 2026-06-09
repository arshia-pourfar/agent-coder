import { z } from "zod";

export const ToolCallSchema = z.object({
    tool: z.string(),
    parameters: z.record(z.unknown()),
});

export function validateToolCall(input: unknown) {
    return ToolCallSchema.parse(input);
}