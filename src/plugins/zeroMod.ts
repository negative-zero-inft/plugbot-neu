import { Events } from "discord.js";
import { PluginTools, PluginCommand } from "../other/typing";
import { log } from "../other/utils";
import { readdirSync } from "fs";

export = {
    name: "zeroMod",
    developers: ["nrd"],
    version: "0.0.1",
    cmds: [],
    cmdLoader: async () => {

        const commands = new Map();
        const cmds = readdirSync("./build/other/zeromod/cmds").filter(file => file.endsWith(".js"));
        for (const u of cmds) {
            try {
                const a: PluginCommand = await require(`../other/zeromod/cmds/${u}`);
                log(`found command ${a.name}`, 4, "zeroMod", true);
                commands.set(a.name, a);
            } catch (e) {
                log("loading commands failed:", 2, "zeroMod", true);
                console.error(e);
                continue;
            }
        }
        return commands;
    },
    run: (_tools: PluginTools) => {

        // make it check for all members in zero negativum and assign them a new profile if there isn't any assigned to them
        // mods should be able to assign the user to their profile
        // i have no clue how to do this doe and i'm at school so ehh
        log("ready", 4, "zeroMod", true);
    }
}