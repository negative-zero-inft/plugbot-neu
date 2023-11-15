import log from "../other/log"
import { CmdTools } from "../other/typing";

module.exports = {

    name: "reply",
    developers: ["nrd"],
    version: "0.0.1",
    run: (tools: CmdTools) =>{

        // if(!tools.input.args[1]) return log(`please input the message id that you're replying to`, 1, "sendmsg", true)
        // if(!tools.input.args[2]) return log(`please input the message content`, 1, "sendmsg", true)
        try{

            const msg = tools.input.args.splice(2).join(" ")
            tools.client.channels.cache.forEach(async channel => {

                if (channel.type !== 0) return
                const message = await channel.messages.fetch(tools.input.args[1])
                if(!message) return
                console.log(message)
                // message.reply(msg) 
                // log(`replied with ${msg} to ${message.content} (sent by ${message.author})`, 4, "sendmsg", true, true)
            });
            return
        }catch(err){

            log(`couldn't send ${tools.input.args[2]}:`, 2, "sendmsg", true)
            console.error(err)
            return
        }
    }
}
// hiii <333
// pp
// XD
// i just haven't read the rest of code yet :3
// lol :3