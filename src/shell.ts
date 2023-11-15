// import suffering from "hell"
import log from "./other/log"
import * as cfg from "./configs/shell.json"
import { readdirSync } from "fs";
import { Events } from "discord.js";
import { Account, Plugin, Command } from "./other/typing";
import { Interface } from "readline";
import { PlugBot } from "./other/client";
import styleSetup from "./other/styleSetup.cjs"

const pgins = readdirSync("./src/plugins").filter(file => file.endsWith(`.js`));
const cmds = readdirSync("./src/commands").filter(file => file.endsWith(`.js`));
const client = new PlugBot();
const commands = new Map<string, Command>()
const mem = new Map()

export default async (rl: Interface, account: Account) =>{

    client.login(account.token)
    client.once(Events.ClientReady, () =>run(rl, account)) // just wanted to put it somewhere else :3
}
const run = async (rl: Interface, account: Account) => {

    log(cfg.bot.ready, 4, "shell", true)
    for(const u of pgins) {
        try {
            const a: Plugin = await require(`./plugins/${u}`)
            log(`found plugin ${a.name}`, 4, "shell", true)
            client.plugins.set(a.name, a); 
            client.plugins.get(a.name)?.run({

                client: client,
                account: account
            })
        } catch(e) {
            log(`loading plugins failed:`, 2, "shell", true)
            console.error(e)
            continue
        }
    }
    cmdLoop(rl, account)
}
const cmdLoop = async (rl, account) =>{
    
    for(const u of cmds) {
        try {
            const a: Plugin = await require(`./commands/${u}`)
            log(`found plugin ${a.name}`, 4, "shell", true)
            commands.set(a.name, a); 
        } catch(e) {
            log(`loading commands failed:`, 2, "shell", true)
            console.error(e)
            continue
        }
    }
    rl.question(styleSetup(cfg.shell.prompt, account.name), (line) =>{

        log(`entered ${line} into command line`, 0, "shell", false, true)
        const primArgs = line.split(" ")
        if(commands.has(primArgs[0])){

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
            })
        }else log(`command ${primArgs[0]} does not exist`, 1, "shell", true)
        return cmdLoop(rl, account)
    })
}