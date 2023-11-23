import { Events, EmbedBuilder, Message, ButtonBuilder, ButtonComponent, ActionRowBuilder, MessageActionRowComponentBuilder, MessageComponentInteraction, InteractionType } from "discord.js"
import { CmdTools, Plugin, PluginCmdTools, PluginCommand, PluginTools } from "../other/typing"
import * as cmdConf from "../configs/globalCmd.json"
import * as helpConf from "../configs/universalHelp.json"
import { colorConverter, uniqueID } from "../other/utils"

interface cmdCollection {
    plugin: string,
    cmds: PluginCommand[]
}

async function textCmdHandler(allCmds: cmdCollection[], tools: PluginCmdTools, msg: Message<boolean>) {
    const args = msg.content.split(/ +/g)
    args.shift()
    
    let currentPage = 0;
    if(args[0] && !isNaN(Number(args[0]))) {
        currentPage = (Number(args[0]) - 1) == -1 ? 0 : Number(args[0]) - 1
    }

    function embedConstructor(cmd: cmdCollection) {
        const e = new EmbedBuilder() 
        .setColor(colorConverter(helpConf.embedColor))
        .setTitle(`${cmd.plugin}'s commands [${cmd.cmds.length}]`)
        .setFooter({text: `Page ${currentPage + 1}/${allCmds.length}`})
        // fields limit
        for(const plugcommands of cmd.cmds.slice(0, 24)) {
            e.addFields([{
                name: `${plugcommands.name} (v${plugcommands.version})`, value: plugcommands.desc
            }])
        }

        return e.toJSON()
    }
    const id = uniqueID(6)
    
    const nextbtns = new ButtonBuilder()
    .setCustomId(`next-${id}`)
    .setEmoji("➡️")
    
    const prevbtns = new ButtonBuilder()
    .setCustomId(`prev-${id}`)
    .setEmoji("⬅️")

    const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(nextbtns, prevbtns)

    const messageToEdit = await msg.channel.send({ // i'm thinking of making it so that you first pick the plugin and then go through commands in that plugin
        content: "installed plugins:",
        embeds:
        [embedConstructor(allCmds[currentPage])],
        components: [row]
    }) 

    tools.client.on(Events.InteractionCreate, i => {
        if(i.type == InteractionType.MessageComponent) {
            let didItPress: boolean;
            switch(i.id) {
                case `prev-${id}`:
                    if(allCmds.length <= currentPage) return;
                    currentPage++
                    didItPress = true;
                case `next-${id}`:
                    if(currentPage == 0) return;
                    currentPage--
                    didItPress = true;
                default: 
                    didItPress = false
            }
        }
    })
}

module.exports = {
    name: "universalHelp",
    developers: ["nrd", "catnowblue"],
    version: "0.0.1",
    cmds: [],
    cmdLoader: () =>{
        
    },
    run: (tools: PluginTools) =>{

        const allCmds: cmdCollection[] = [];

        tools.client.plugins.forEach(p =>{

            allCmds.push({

                plugin: p.name,
                cmds: []
            })
            p.cmds?.forEach(cmd =>{

                allCmds.find((x) => x.plugin === p.name)?.cmds.push(cmd)
            });
        }); 

        tools.client.on(Events.MessageCreate, (m) =>{

            const args = m.content.split(" ")
            // if(m.content === `${cmdConf.textCmdPrefix}help`){
                
            //     if(!args[1])
            // };
        }); 
    }
};