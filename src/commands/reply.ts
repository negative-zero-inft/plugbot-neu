import { TextChannel } from "discord.js";
import { CmdTools } from "../other/typing";
import { isValidSnowflake, log } from "../other/utils";

export = {
    name: "reply",
    developers: ["nrd", "catnowblue"],
    version: "1.0.1",
    desc: "reply to a message on discord",
    usage: "reply [message ID to reply to] [channel ID of the message] [reply]",
    run: (tools: CmdTools) => {

        const channelId = tools.input.args[2];
        const messageId = tools.input.args[1];

        if (!messageId || !isValidSnowflake(messageId)) return log("please input the message id that you're replying to", "reply", {
            username: tools.account.name,
            level: 1
        });
        if (!channelId || !isValidSnowflake(channelId)) return log("please input the channel id that you're replying in", "reply", {
            username: tools.account.name,
            level: 1
        });
        if (!tools.input.args[3]) return log("please input the message content", "reply", {
            username: tools.account.name,
            level: 1
        });

        const msg = tools.input.args.splice(3).join(" ");
        const channel = tools.client.channels.cache.get(channelId) as TextChannel;
        channel.messages.fetch(messageId).then(m => {
            m.reply(msg);
            log(`sent ${msg} in reply to ${m.content}`, "reply", {
                saveFile: true,
                username: tools.account.name,
                level: 4
            });
        });
    }
}