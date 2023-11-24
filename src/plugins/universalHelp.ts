import { Events, EmbedBuilder, Message, ButtonBuilder, ActionRowBuilder, MessageActionRowComponentBuilder, InteractionType, CacheType, Interaction, ButtonStyle } from "discord.js";
import { PluginCommand, PluginTools } from "../other/typing";
import * as helpConf from "../configs/universalHelp.json";
import * as cmdConf from "../configs/globalCmd.json";
import { colorConverter, uniqueID, log } from "../other/utils";

interface cmdCollection {
    plugin: string,
    cmds: PluginCommand[]
}

async function textCmdHandler(allCmds: cmdCollection[], tools: PluginTools, msg: Message<boolean>) {
    const args = msg.content.split(/ +/g);
    args.shift();

    let currentPage = 0;
    if (args[0] && !isNaN(Number(args[0]))) {
        if (allCmds.length <= Number(args[0])) return;
        currentPage = Number(args[0]) <= 0 ? 0 : Number(args[0]) - 1;
    }

    function embedConstructor(cmd: cmdCollection | undefined) {
        const e = new EmbedBuilder()
            .setColor(colorConverter(helpConf.embedColor))
            .setTitle(`${cmd?.plugin}'s commands [${cmd?.cmds.length}]`)
            .setFooter({ text: `Page ${currentPage + 1}/${allCmds.length}` });
        // fields limit
        if (typeof cmd != "undefined") {
            for (const plugcommands of cmd.cmds.slice(0, 24)) {
                e.addFields({
                    name: `${plugcommands.name} (v${plugcommands.version})`, value: plugcommands.desc
                });
            }
        } else {
            e.setDescription("No commands found.");
        }

        return e.toJSON();
    }
    const id = uniqueID(6); // co kurwa

    const nextbtns = new ButtonBuilder()
        .setCustomId(`next-${id}`)
        .setEmoji("➡️")
        .setStyle(ButtonStyle.Primary);

    const prevbtns = new ButtonBuilder()
        .setCustomId(`prev-${id}`)
        .setEmoji("⬅️")
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(prevbtns, nextbtns);

    await msg.channel.send({ // i'm thinking of making it so that you first pick the plugin and then go through commands in that plugin
        content: "installed plugins:",
        embeds:
            [embedConstructor(allCmds[currentPage])],
        components: [row]
    });

    async function interactionHandler(i: Interaction<CacheType>) {
        if (i.type == InteractionType.MessageComponent && i.customId.endsWith(id)) {
            switch (i.customId) {
                case `prev-${id}`:
                    if (currentPage == 0) break;
                    currentPage--;
                    break;
                case `next-${id}`:
                    if (allCmds.length <= currentPage + 1) break;
                    currentPage++;
                    break;
                default:
                    break;
            }
            await i.update({
                content: "installed plugins:",
                embeds:
                    [embedConstructor(allCmds[currentPage])],
                components: [row]
            });
        }
    }

    tools.client.addListener(Events.InteractionCreate, interactionHandler);

    // self destruct after 30 seconds
    setTimeout(() => {
        tools.client.removeListener(Events.InteractionCreate, interactionHandler);
    }, 30e3);
}

module.exports = {
    name: "universalHelp",
    developers: ["nrd", "catnowblue"],
    version: "0.0.2",
    cmds: [],
    cmdLoader: () => {

        const cmds: PluginCommand[] = [];
        if (helpConf.textCmds) {

            const textCmd: PluginCommand = {

                name: `${cmdConf.textCmdPrefix}help`,
                desc: "plugbot help menu",
                usage: `${cmdConf.textCmdPrefix}help`,
                version: "0.0.1",
                exec: () => { }
            };
            cmds.push(textCmd);
        }
        return cmds;
    },
    run: async (tools: PluginTools) => {

        const allCmds: cmdCollection[] = [];
        tools.client.plugins.forEach(p => {

            log(`registered ${p.name}`, 4, "universalHelp", true);

            allCmds.push({

                plugin: p.name,
                cmds: []
            });
            p.cmds?.forEach(cmd => {

                allCmds.find((x) => x.plugin === p.name)?.cmds.push(cmd);
            });
        });

        tools.client.on(Events.MessageCreate, async (m) => {

            if (m.content.slice(0, cmdConf.textCmdPrefix.length) != cmdConf.textCmdPrefix) return;
            const args: string[] = argsSplitter(m.content.slice(cmdConf.textCmdPrefix.length)); // good enough for this, but nothing else. to be cleaned up later
            if (args[0] === "help") {
                await textCmdHandler(allCmds, tools, m);
            }
        });
    }
};

function argsSplitter(str: string) {
    // don't split in quotes
    const match = str.match(/(("|').*?("|')|([^"\s]|[^'\s])+)+(?=\s*|\s*$)/g);
    if (!match) {
        return str.split(/\s+/g);
    } else {
        return match;
    }
}