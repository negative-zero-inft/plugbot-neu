import { TextChannel } from "discord.js";
import { isValidSnowflake, log } from "../other/utils";
import { CmdTools } from "../other/typing";

export = {

    name: "sendmsg",
    developers: ["nrd", "catnowblue"],
    version: "1.0.2",
    desc: "send a message to any discord channel that the bot is in",
    usage: "sendmsg [channel ID to send a message in] [message]",
    run: (tools: CmdTools) => {

        const channelid = tools.input.args[1];
        if (!channelid || !isValidSnowflake(channelid)) return log("please input the channel id", "sendmsg", {
            username: tools.account.name,
            level: 1
        });
        if (!tools.input.args[2]) return log("please input the message content", "sendmsg", {
            username: tools.account.name,
            level: 1
        });
        const channel = tools.client.channels.cache.get(channelid) as TextChannel;
        const msg = tools.input.args.splice(2).join(" ");
        channel.send(msg);
        log(`sent ${msg}`, "sendmsg", {
            saveFile: true,
            username: tools.account.name,
            level: 4
        });
        return;
    }
}