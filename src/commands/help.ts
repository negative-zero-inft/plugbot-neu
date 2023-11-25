import { CmdTools } from "../other/typing";
import c from "chalk";

export = {
    name: "help",
    developers: ["nrd", "catnowblue", "richard stallman", "gabe newell", "sex", "sex", "sex", "sex", "sex", "sex"],
    version: "1.1.0",
    desc: "help command. kijetesantakalu kijetesantakalu kijetesantakalu kijetesantakalu kijetesantakalu kijetesantakalu kijetesantakalu kijetesantakalu kijetesantakalu kijetesantakalu ",
    usage: "help ",
    run: (tools: CmdTools) => {
        const array = Array.from(tools.cmdTools.cmds.values());

        console.log(c.bold(c.underline("Commands in this plugbot install:")));
        for (const cmds of array) {
            console.log(`${c.bold(cmds.name)} [v${cmds.version}] - author${cmds.developers.length > 1 ? "s" : ""}: ${cmds.developers.map(m => c.blue(m)).join(", ")}
${c.gray(cmds.desc)}\n`);
        }
    }
}