import { Events } from "discord.js"
import { PluginTools, PluginCommand } from "../other/typing"
import { log } from "../other/utils"
import { readdirSync } from "fs"

export = {
    name: "zeroMod",
    developers: ["nrd"],
    version: "1.0.0",
    cmds: [],
    cmdLoader: async () =>{
      
        const commands = new Map()
        const cmds = readdirSync("./build/other/zeromod/cmds").filter(file => file.endsWith(`.js`));
        for(const u of cmds) {
            try {
                let a: PluginCommand = await require(`./plugins/${u}`)
                log(`found command ${a.name}`, 4, "zeroMod", true)
                commands.set(a.name, a);
            } catch(e) {
                log(`loading plugins failed:`, 2, "zeroMod", true)
                console.error(e)
                continue
            }
        }
    },
    run: (tools: PluginTools) =>{
        
        // make it check for all members in zero negativum and assign them a new profile if there isn't any assigned to them
        // mods should be able to assign the user to their profile
        // i have no clue how to do this doe and i'm at school so ehh
        log("ready", 4, "zeroMod", true)
    }
}