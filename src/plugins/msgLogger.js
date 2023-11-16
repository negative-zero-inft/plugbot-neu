"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const log_1 = __importDefault(require("../other/log"));
module.exports = {
    name: "msgLogger",
    developers: ["nrd"],
    version: "0.0.1",
    run: (tools) => {
        tools.client.on(discord_js_1.Events.MessageCreate, (msg) => {
            (0, log_1.default)(`${msg.author.username} said ${msg.content}`, 0, "msgLogger", true, true);
        });
    }
};
