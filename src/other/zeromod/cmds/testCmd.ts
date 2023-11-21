import { PluginCmdTools } from "../../typing";

export = {

    name: "test",
    desc: "test",
    usage: "/test",
    version: "0.0.0",
    exec: (tools: PluginCmdTools) =>{

        tools.interaction.channel?.send("h")
    }
}