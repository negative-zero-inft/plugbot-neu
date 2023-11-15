// import suffering from "hell"
import log from "./other/log"
import * as cfg from "./configs/shell.json"
import { readdirSync } from "fs";
import { Events} from "discord.js";
import { Account, Plugin, CmdTools, Command } from "./other/typing";
import { Interface } from "readline";
import { PlugBot } from "./other/client";

const pgins = readdirSync("./src/plugins").filter(file => file.endsWith(`.js`));
const cmds = readdirSync("./src/commands").filter(file => file.endsWith(`.js`));
const client = new PlugBot();
const commands = new Map<string, Command>()

export default async (rl: Interface, account: Account) =>{

    for(const u of cmds) {
        try {
            const a: Plugin = await require(`./plugins/${u}`)
            log(`found plugin ${a.name}`, 4, "shell", true)
            commands.set(a.name, a); 
            commands.get(a.name)?.run({
    
                client: client,
                rl: rl,
                account: account
            })
        } catch(e) {
            log(`loading plugins failed:`, 2, "shell", true)
            console.error(e)
            continue
        }
    }
    client.login(account.token)
    client.once(Events.ClientReady, () =>run(account, rl)) // just wanted to put it somewhere else :3
}
const run = async (account: Account, rl: Interface) => {

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
}