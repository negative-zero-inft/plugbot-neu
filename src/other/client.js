"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlugBot = void 0;
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
// a custom class based on Discord.JS' client
class PlugBot extends discord_js_2.Client {
    commands;
    plugins;
    constructor() {
        super({
            intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.MessageContent, discord_js_1.GatewayIntentBits.GuildMembers]
        });
        this.plugins = new Map();
        // to cnb: the stuff in the src/commands folder is for the person controlling the bot
        // the commands that you run on discord are a plugin side thing
        // i want to keep it as minimal as i can with this
    }
}
exports.PlugBot = PlugBot;
