"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const log_1 = __importDefault(require("./other/log"));
const readline_1 = require("readline");
const stream_1 = require("stream");
const styleSetup_js_1 = __importDefault(require("./other/styleSetup.js"));
const cfg = __importStar(require("./configs/shell.json"));
const bcrypt_1 = require("bcrypt");
const fs_2 = require("fs");
const shell_1 = __importDefault(require("./shell"));
// useful for passwords
var isInputVisible = true;
const stdoutPremium = new stream_1.Writable({
    write: function (chunk, encoding, callback) {
        if (isInputVisible) {
            process.stdout.write(chunk, encoding);
        }
        callback();
    }
});
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: stdoutPremium,
    terminal: true
});
const accounts = new Map();
// i have no clue why it won't work unless i put it in an async func :fire:
const run = async () => {
    // ily cnb
    const acnts = (0, fs_1.readdirSync)("./src/other/accounts").filter(file => file.endsWith(`.json`));
    for (const u of acnts) {
        try {
            const a = await require(`./other/accounts/${u}`);
            accounts.set(a.name, a);
            (0, log_1.default)(`found account ${a.name}`, 4, "shell", true);
        }
        catch (e) {
            (0, log_1.default)(`loading accounts failed:`, 2, "shell", true, true);
            console.error(e);
            continue;
        }
    }
    // why not use stylesetup if we can
    rl.question((0, styleSetup_js_1.default)(cfg.login.q.name), async (name) => {
        const acnt = accounts.get(name);
        if (!acnt)
            if (name.toLowerCase() === cfg.login.newAccountCmd) {
                newUserProc();
            }
            else {
                (0, log_1.default)(cfg.login.accountMissingMsg, 1, "shell", true);
                run();
            }
        else {
            isInputVisible = false;
            process.stdout.write((0, styleSetup_js_1.default)(cfg.login.q.password));
            rl.question("", (password) => {
                process.stdout.write("\n"); // goofy workaround
                isInputVisible = true;
                if ((0, bcrypt_1.compareSync)(password, acnt?.password))
                    return (0, shell_1.default)(rl, acnt);
                run();
            });
        }
    });
};
const newUserProc = async () => {
    rl.question(cfg.newAcc.q.name, (name) => {
        if (accounts.get(name)) {
            (0, log_1.default)(cfg.newAcc.exists, 1, "shell", true);
            return run();
        }
        if (name.toLowerCase() === cfg.login.newAccountCmd) {
            (0, log_1.default)(cfg.newAcc.exists, 1, "shell", true);
            return run();
        }
        rl.question(cfg.newAcc.q.pswd, (pswd) => {
            rl.question(cfg.newAcc.q.token, (token) => {
                var newUser = {
                    name: name,
                    password: pswd,
                    token: token
                };
                console.log(newUser);
                rl.question(cfg.newAcc.q.confirm, async (answer) => {
                    const salt = await (0, bcrypt_1.genSalt)(10);
                    const password = await (0, bcrypt_1.hash)(pswd, salt);
                    newUser = {
                        name: name,
                        password: password,
                        token: token
                    };
                    if (answer.toLowerCase() === "y" || "yes") {
                        await (0, fs_2.appendFileSync)(`./src/other/accounts/${name.replace('/', "_")}.json`, JSON.stringify(newUser));
                        (0, log_1.default)(`finished saving user ${name}`, 4, "shell", true, true);
                    }
                    return run();
                });
            });
        });
    });
};
// random rl stuff, feel free to ignore
rl.on("close", () => { (0, log_1.default)("readline was closed", 1, "shell", true); });
rl.on("pause", () => { (0, log_1.default)("readline was paused", 1, "shell, true"); });
run();
