import { CmdTools } from "../other/typing";

export = {
    name: "help",
    developers: ["nrd"],
    version: "1.0.1",
    desc: "help command",
    usage: "help",
    run: (tools: CmdTools) => {
        console.log(tools.cmdTools.cmds);
    }
}