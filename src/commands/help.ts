import {CmdTools} from "../other/typing"

module.exports = {
    name: "help",
    developers: ["nrd"],
    version: "0.0.1",
    usage: "help",
    run: (tools: CmdTools) =>{
        console.log(tools.cmdTools.cmds)
    }
}