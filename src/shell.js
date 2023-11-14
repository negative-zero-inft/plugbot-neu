"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("./other/log"));
const fs_1 = require("fs");
const plugins = new Map();
const pgins = (0, fs_1.readdirSync)("./src/plugins").filter(file => file.endsWith(`.js`));
exports.default = async (rl, account) => {
    for (const u of pgins) {
        try {
            const a = await require(`./plugins/${u}`);
            (0, log_1.default)(`found plugin ${a.name}`, 4, "shell", true);
            plugins.set(a.name, a);
            plugins.get(a.name)?.run();
        }
        catch (e) {
            (0, log_1.default)(`loading plugins failed:`, 2, "shell", true);
            console.error(e);
            continue;
        }
    }
};
