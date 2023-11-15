import log from "../other/log"

module.exports = {

    name: "sendmsg",
    developers: ["nrd"],
    version: "0.0.1",
    run: (tools) =>{

        const channel = tools.client.channels.cache.get(tools.input.args[1]);
        channel.send(tools.input.args.splice(2).join(" "));
    }
}