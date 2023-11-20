import { Events } from "discord.js"
import { PluginTools } from "../other/typing"
import { log } from "../other/utils"

export = {
    name: "zeroMod",
    developers: ["nrd"],
    version: "1.0.0",
    run: (tools: PluginTools) =>{
        
        log("ready", 4, "zeroMod", true)
    }
}