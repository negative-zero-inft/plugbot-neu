import log from "./other/log"
import * as cfg from "./configs/shell.json"
import { readdirSync } from "fs";
import { Client } from "discord.js";

interface Plugin{
    // tools are whatever we decide pass down in the future
    name: string
    developers: Array<string>
    version: number
    run
}
const plugins: Map<string, Plugin> = new Map<string, Plugin>(); 
const pgins = readdirSync("./src/plugins").filter(file => file.endsWith(`.js`));

export default async (rl, account) =>{

    
    for(const u of pgins) {
        try {
            const a: Plugin = await require(`./plugins/${u}`)
            log(`found plugin ${a.name}`, 4, "shell", true)
            plugins.set(a.name, a); 
            plugins.get(a.name)?.run()
        } catch(e) {
            log(`loading plugins failed:`, 2, "shell", true)
            console.error(e)
            continue
        }
    }
}