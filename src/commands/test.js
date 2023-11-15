"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("../other/log"));
module.exports = {
    name: "test",
    developers: ["nrd"],
    version: "0.0.1",
    run: (tools) => {
        (0, log_1.default)("works well", 4, tools.account.name, true);
    }
};
