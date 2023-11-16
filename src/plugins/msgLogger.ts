import { Events } from "discord.js"
import { PluginTools } from "../other/typing"
import log from "../other/log"

module.exports = {
    name: "msgLogger",
    developers: ["nrd"],
    version: "0.0.1",
    run: (tools: PluginTools) =>{
        
        tools.client.on(Events.MessageCreate, (msg) =>{

            log(`${msg.author.username} said ${msg.content}`, 0, "msgLogger", true, true)
        })
    }
}