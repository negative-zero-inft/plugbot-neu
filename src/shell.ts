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

export default async (rl: Interface, account: Account) =>{

    client.login(account.token);
    client.once(Events.ClientReady, () =>run(rl, account)); 
};

// runs when the client finished logging in
const run = async (rl: Interface, account: Account) => {

    log(cfg.bot.ready, 4, "shell", true);
    for(const u of pgins) {
        try {
            const a: Plugin = await require(`./plugins/${u}`);
            log(`found plugin ${a.name} (${a.version})`, 4, "shell", true);
            if(typeof a.cmdLoader == "function") a.cmds = await a.cmdLoader(); 
            client.plugins.set(a.name, a);
            a?.run({
                client, account
            }); 
        } catch(e) {
            log("loading plugins failed:", 2, "shell", true);
            console.error(e);
            continue;
        }
    }
    cmdLoop(rl, account);
};

// runs every time you need to type a command

const cmdLoop = async (rl: Interface, account: Account) =>{
    
    for(const u of cmds) {
        try {
            const a: Command = await require(`./commands/${u}`);
            commands.set(a.name, a); 
        } catch(e) {
            log("loading commands failed:", 2, "shell", true);
            console.error(e);
            continue;
        }
    }
    rl.question(styleSetup(cfg.shell.prompt, account.name), (line) =>{

        log(`entered ${line} into command line`, 0, "shell", false, true);
        const primArgs = line.split(" ");
        if(commands.has(primArgs[0])){

            try{

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
            }catch(err){

                log("the program has crashed:", 2, primArgs[0], true);
                console.error(err);
            }
        }else log(`command ${primArgs[0]} does not exist`, 1, "shell", true);
        return cmdLoop(rl, account);
    });
};