import { z } from "zod";

export const ToolCallSchema = z.object({
    tool: z.string(),
    parameters: z.record(z.unknown())
});

export type ValidToolCall = z.infer<
    typeof ToolCallSchema
>;

export function validateToolCall(
    input: unknown
): ValidToolCall {
    return ToolCallSchema.parse(input);
}