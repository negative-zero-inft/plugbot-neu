import { Events, EmbedBuilder } from "discord.js"
import { PluginCommand, PluginTools } from "../other/typing"
import * as cmdConf from "../configs/globalCmd.json"

module.exports = {
    name: "universalHelp",
    developers: ["nrd"],
    version: "0.0.1",
    cmds: [],
    cmdLoader: () =>{
        
    },
    run: (tools: PluginTools) =>{
    
        var allCmds: PluginCommand[] = []

        tools.client.plugins.forEach(p =>{

            p.cmds?.forEach(cmd =>{

                allCmds.push(cmd)
            })
        })

        tools.client.on(Events.MessageCreate, (m) =>{

            if(m.content === `${cmdConf.textCmdPrefix}help`){

                m.reply(`this plugin is still wip, here's a text message as a temp measure\n${allCmds.join(", ")}`)
            }
        })
    }
}