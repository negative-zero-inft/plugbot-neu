import { EmbedBuilder, Events, Message } from "discord.js";
import { PluginCommand, PluginTools } from "../other/typing";
import * as helpConf from "../configs/universalHelp.json";
import * as cmdConf from "../configs/globalCmd.json";
import { colorConverter, log } from "../other/utils";
import { paginator } from "../other/paginator";

interface cmdCollection {
    plugin: string,
    cmds: PluginCommand[]
}

async function textCmdHandler(allCmds: cmdCollection[], tools: PluginTools, msg: Message<boolean>) {
    const embeds = [];
    for (const cmds of allCmds) {
        if (cmds.cmds.length === 0) {

            log(`plugin ${cmds.plugin} has no commands, skipping.`, "universalHelp", {
                display: true,
                saveFile: false,
                username: tools.account.name,
                level: 1
            });
            continue;
        }
        const e = new EmbedBuilder()
            .setTitle(`${cmds.plugin}'s commands`)
            .setColor(colorConverter(helpConf.embedColor));
        for (const c of cmds.cmds) {
            e.addFields({
                name: `${c.name} - (${c.version})`,
                value: c.desc
            });
        }
        embeds.push(e.toJSON());
    }
    await paginator(msg, tools.client, embeds, { content: "Installed plugins:" });
}

module.exports = {
    name: "universalHelp",
    developers: ["nrd", "catnowblue"],
    version: "0.0.2",
    cmds: [],
    cmdLoader: (_tools: PluginTools) => {

        const cmds: PluginCommand[] = [];
        if (helpConf.textCmds) {

            const textCmd: PluginCommand = {

                name: "help",
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

            log(`registered ${p.name}`, "universalHelp", {

                display: true,
                username: tools.account.name
            });

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