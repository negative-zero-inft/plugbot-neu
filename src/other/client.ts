import { GatewayIntentBits } from "discord.js";
import { Collection } from "discord.js";
import { Client } from "discord.js";
import { Plugin } from "./typing";

export class PlugBot extends Client {
    
    public plugins: Map<string, Plugin>; 
    public constructor() {

        super({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages]
        });

        this.plugins = new Map();
    }
}