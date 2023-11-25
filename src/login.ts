import { mkdir, readdirSync, rmSync } from "fs";
import { createInterface } from "readline";
import { Writable } from "stream";
import { styleSetup, log } from "./other/utils";
import * as cfg from "./configs/shell.json";
import { genSalt, hash, compareSync } from "bcrypt";
import { appendFileSync } from "fs";
import shell from "./shell";
import { Account } from "./other/typing";
import { exit } from "process";
import colors from "chalk";

// set to false when dealing with passwords
let isInputVisible = true;

// no way stdout premium :fire:

const stdoutPremium = new Writable({

    write: function (chunk, encoding, callback) {

        if (isInputVisible) {

            process.stdout.write(chunk, encoding);
        }
        callback();
    }
});
const rl = createInterface({

    input: process.stdin,
    output: stdoutPremium,
    terminal: true
});

const accounts: Map<string, Account> = new Map<string, Account>();

const run = async () => {

    // temp redoing
    rmSync("./temp", { recursive: true });
    mkdir("./temp", {}, (err) => {

        err;
        "shut up";
    });
    const acnts = readdirSync("./userSpace/accounts").filter(file => file.endsWith(".json"));
    for (const u of acnts) {
        try {
            const a: Account = await require(`../userSpace/accounts/${u}`);
            accounts.set(a.name, a);
            log(`found account ${a.name}`, "shell", {
                level: 4
            });
        } catch (e) {
            log("loading accounts failed:", "shell", {
                level: 2
            });
            console.error(e);
            continue;
        }
    }

    rl.question(styleSetup(cfg.login.q.name), async (name) => {

        const acnt = accounts.get(name);
        if (!acnt) if (name.toLowerCase() === cfg.login.newAccountCmd) { newUserProc(); } else {
            log(cfg.login.accountMissingMsg, "shell", { level: 1 }); run();
        } else {

            isInputVisible = false;
            process.stdout.write(styleSetup(cfg.login.q.password));
            rl.question("", (password) => {

                process.stdout.write("\n"); // goofy workaround
                isInputVisible = true;
                if (compareSync(password, acnt?.password)) return shell(rl, acnt);
                run();
            });
        }
    });
};

const newUserProc = async () => {

    rl.question(cfg.newAcc.q.name, (name) => {

        if (accounts.get(name)) {
            log(cfg.newAcc.exists, "shell", { level: 1 }); return run();
        }
        if (name.toLowerCase() === cfg.login.newAccountCmd) {
            log(cfg.newAcc.exists, "shell", { level: 1 }); return run();
        }

        rl.question(cfg.newAcc.q.pswd, (pswd) => {

            rl.question(cfg.newAcc.q.token, (token) => {

                let newUser = {

                    name: name,
                    password: pswd,
                    token: token
                };
                console.log(`the new user will look like this:\n${colors.bold("name")}: ${newUser.name}\n${colors.bold("password")}: ${newUser.password}\n${colors.bold("token")}: ${newUser.token}`);
                rl.question(cfg.newAcc.q.confirm, async (answer) => {

                    const salt = await genSalt(10);
                    const password = await hash(pswd, salt);
                    newUser = {

                        name: name,
                        password: password,
                        token: token
                    };
                    if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {

                        appendFileSync(`./userSpace/accounts/${name.replace("/", "_")}.json`, JSON.stringify(newUser));
                        log(`finished saving user ${name}`, "shell", {
                            saveFile: true,
                            level: 4
                        });
                    }
                    return run();
                });
            });
        });
    });
};
rl.on("close", () => {
    exit();
});
rl.on("pause", () => {
    log("readline was paused", "shell", {
        display: true,
        saveFile: false,
        level: 1
    });
});
run();