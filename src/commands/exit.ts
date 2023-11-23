import { CmdTools } from "../other/typing";
import { log } from "../other/utils";

module.exports = {
    name: "exit",
    developers: ["nrd"],
    version: "1.0.1",
    desc: "shut down plugbot",
    usage: "exit",
    run: (_tools: CmdTools) => {

        log("closing plugbot...", 0, "exit");
        process.exit(0);
    }
};