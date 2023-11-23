import { Events } from "discord.js";
import { PluginTools } from "../other/typing";
import { log } from "../other/utils";

export = {
    name: "msgLogger",
    developers: ["nrd"],
    version: "1.0.0",
    run: (tools: PluginTools) =>{
        
        log("ready", 4, "msgLogger", true);
        tools.client.on(Events.MessageCreate, (msg) =>{

            log(`${msg.author.username} said ${msg.content}`, 0, "msgLogger", true, true);
        });
    }
}