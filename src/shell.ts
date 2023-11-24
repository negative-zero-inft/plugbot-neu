import { styleSetup, log } from "./other/utils";
import * as cfg from "./configs/shell.json";
import { readdirSync } from "fs";
import { Events } from "discord.js";
import { Account, Plugin, Command } from "./other/typing";
import { Interface } from "readline";
import { PlugBot } from "./other/client";

const pgins = readdirSync("./build/plugins").filter(file => file.endsWith(".js"));
const cmds = readdirSync("./build/commands").filter(file => file.endsWith(".js"));
const client = new PlugBot();
const commands = new Map<string, Command>();
const mem = new Map();

export default async (rl: Interface, account: Account) => {

    client.login(account.token);
    client.once(Events.ClientReady, () => run(rl, account));
};

// runs when the client finished logging in
const run = async (rl: Interface, account: Account) => {

    log(cfg.bot.ready, "shell", {
        display: true,
        saveFile: false,
        username: account.name,
        level: 4
    })
    for (const u of pgins) {
        try {
            const a: Plugin = await require(`./plugins/${u}`);
            if (!a.name || !a.run || !a.version || !a.developers) {

                log(`found found an invalid plugin (${u})`, "shell", {
                    display: true,
                    saveFile: false,
                    username: account.name,
                    level: 1
                });
                continue;
            }
            log(`found plugin ${a.name} (${a.version})`, "shell", {
                display: true,
                saveFile: false,
                username: account.name,
                level: 4
            })
            if (typeof a.cmdLoader == "function") a.cmds = await a.cmdLoader({ client, account });
            client.plugins.set(a.name, a);
        } catch (e) {
            log("loading plugins failed:", "shell", {
                display: true,
                saveFile: false,
                username: account.name,
                level: 2
            })
            console.error(e);
            continue;
        }
    }
    client.plugins.forEach(x => x.run({ client, account }));
    cmdLoop(rl, account);
};

// runs every time you need to type a command
const cmdLoop = async (rl: Interface, account: Account) => {

    for (const u of cmds) {
        try {
            const a: Command = await require(`./commands/${u}`);
            if (!a.name || !a.desc || !a.run || !a.usage || !a.version || !a.developers) {

                log(`found found an invalid command (${u})`, "shell", {
                    display: true,
                    saveFile: false,
                    username: account.name,
                    level: 1
                })
                continue;
            }
            commands.set(a.name, a);
        } catch (e) {
            log("loading commands failed:", "shell", {
                display: true,
                saveFile: false,
                username: account.name,
                level: 2
            })
            console.error(e);
            continue;
        }
    }
    rl.question(styleSetup(cfg.shell.prompt, account.name), (line) => {

        log(`entered ${line} into command line`, "shell", {
            display: false,
            saveFile: true,
            username: account.name,
            level: 0
        })
        const primArgs = line.split(" ");
        if (commands.has(primArgs[0])) {

            try {

                commands.get(primArgs[0])?.run({

                    client: client,
                    input: {

                        raw: line,
                        args: primArgs
                    },
                    cmdTools: {

                        rl: rl,
                        mem: mem,
                        cmds: commands
                    },
                    account: account
                });
            } catch (err) {

                log("the program has crashed:", primArgs[0], {
                    display: true,
                    saveFile: false,
                    username: account.name,
                    level: 2
                })
                console.error(err);
            }
        } else log(`command ${primArgs[0]} does not exist`, "shell", {
            display: true,
            saveFile: false,
            username: account.name,
            level: 1
        })
        return cmdLoop(rl, account);
    });
};