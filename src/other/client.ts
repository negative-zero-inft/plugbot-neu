import { GatewayIntentBits } from "discord.js";
import { Collection } from "discord.js";
import { Client } from "discord.js";
import { Plugin } from "./typing";

// a custom class based on Discord.JS' client
export class PlugBot extends Client {
    
    public plugins: Map<string, Plugin> 
    public constructor() {

        super({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
        })

        this.plugins = new Map();
        // to cnb: the stuff in the src/commands folder is for the person controlling the bot
        // the commands that you run on discord are a plugin side thing
        // i want to keep it as minimal as i can with this
    }
}