import { Events } from "discord.js";
import { PluginTools } from "../other/typing";
import { log } from "../other/utils";

export = {
    name: "msgLogger",
    developers: ["nrd"],
    version: "1.0.0",
    cmds: [],
    run: (tools: PluginTools) => {

        log("ready", "msgLogger", {
            saveFile: true,
            username: tools.account.name
        });
        tools.client.on(Events.MessageCreate, (msg) => {

            log(`${msg.author.username} said ${msg.content}`, "msgLogger", {
                saveFile: true,
                username: tools.account.name
            });
        });
    }
}