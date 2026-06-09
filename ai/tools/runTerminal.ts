import { Tool } from "./tool.interface";

export class RunTerminalTool implements Tool {
    name = "runTerminal" as const;

    description =
        "Execute terminal command";

    async execute(
        parameters: Record<string, unknown>
    ): Promise<string> {

        const command =
            parameters.command as string;

        return "TODO";
    }
}







// import { exec } from "child_process";
// import { promisify } from "util";

// import { Tool } from "./tool.interface";
// import { WorkspaceManager } from "../workspace/workspaceManager";

// const execAsync = promisify(exec);

// export class RunTerminalTool implements Tool {
//     name = "runTerminal" as const;

//     description = "Execute terminal command";

//     constructor(
//         private workspace: WorkspaceManager
//     ) { }

//     async execute(
//         parameters: Record<string, unknown>
//     ): Promise<string> {

//         const command =
//             parameters.command as string;

//         if (!command) {
//             throw new Error("Missing parameter: command");
//         }

//         const { stdout, stderr } = await execAsync(command, {
//             cwd: this.workspace.getRoot()
//         });

//         return [
//             stdout?.trim(),
//             stderr?.trim()
//         ]
//             .filter(Boolean)
//             .join("\n");
//     }
// }