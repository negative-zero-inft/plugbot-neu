import log from "../other/log"
import { CmdTools } from "../other/typing";

module.exports = { // alr lemme run it

    name: "reply",
    developers: ["nrd"],
    version: "0.0.1",
    usage: "reply [message ID to reply to] [reply]",
    run: (tools: CmdTools) =>{

        // if(!tools.input.args[1]) return log(`please input the message id that you're replying to`, 1, "sendmsg", true)
        // if(!tools.input.args[2]) return log(`please input the message content`, 1, "sendmsg", true)
        const msg = tools.input.args.splice(2).join(" ")
        tools.client.channels.cache.forEach(async (channel) => {

            if (channel.type !== 0) return
            const message = await channel.
            messages.fetch(tools.input.args[1])
            if(!message) return
            // ss your view  
            try{
                message.reply(msg) 
                // log(`replied with ${msg} to ${message''.content} (sent by ${message.author})`, 4, "sendmsg", true, true)
            }catch(err) {
                console.error(err)                     
            }
        })
    }
}