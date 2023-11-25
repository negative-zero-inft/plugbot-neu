import { CmdTools } from "../other/typing";
import { log } from "../other/utils";

module.exports = {
    name: "exit",
    developers: ["nrd"],
    version: "1.0.1",
    desc: "shut down plugbot",
    usage: "exit",
    run: (tools: CmdTools) => {

        log("closing plugbot...", "exit", {
            display: true,
            saveFile: false,
            username: tools.account.name
        });
        process.exit(0);
    }
};