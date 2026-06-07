import { z } from "zod";

export const ToolCallSchema = z.object({
    tool: z.enum([
        "readFile",
        "writeFile",
        "searchFiles",
        "runTerminal",
        "listFiles",
    ]),
    args: z.array(z.any()).max(3), // safety limit
});

export type ValidToolCall = z.infer<typeof ToolCallSchema>;

export function validateToolCall(input: unknown): ValidToolCall {
    return ToolCallSchema.parse(input);
}