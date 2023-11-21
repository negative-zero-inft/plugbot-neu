import { Events } from "discord.js"
import { PluginTools } from "../other/typing"
import { log } from "../other/utils"

export = {
    name: "zeroMod",
    developers: ["nrd"],
    version: "1.0.0",
    run: (tools: PluginTools) =>{
        
        // make it check for all members in zero negativum and assign them a new profile if there isn't any assigned to them
        // mods should be able to assign the user to their profile
        // i have no clue how to do this doe and i'm at school so ehh
        log("ready", 4, "zeroMod", true)
    }
}