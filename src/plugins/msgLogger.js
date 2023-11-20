"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const utils_1 = require("../other/utils");
module.exports = {
    name: "msgLogger",
    developers: ["nrd"],
    version: "1.0.0",
    run: (tools) => {
        tools.client.on(discord_js_1.Events.MessageCreate, (msg) => {
            (0, utils_1.log)(`${msg.author.username} said ${msg.content}`, 0, "msgLogger", true, true);
        });
    }
};
