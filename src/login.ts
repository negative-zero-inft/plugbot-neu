import { readdirSync } from "fs";
import log from "./other/log"
import { createInterface } from "readline";
import { Writable } from "stream";
import styleSetup from "./other/styleSetup.cjs";
import * as cfg from "./configs/shell.json"
import { genSalt, hash, compareSync, compare } from "bcrypt";
import { appendFileSync } from "fs";
import shell from "./shell"

interface Account {
    name: string
    password: string
    token: string
} 

// useful for passwords
var isInputVisible = true;

const stdoutPremium = new Writable({

    write: function(chunk, encoding, callback){

        if(isInputVisible){

            process.stdout.write(chunk, encoding);
        }
        callback();
    }
})
const rl = createInterface({

    input: process.stdin,
    output: stdoutPremium,
    terminal: true
})
const accounts: Map<string, Account> = new Map<string, Account>(); 

// i have no clue why it won't work unless i put it in an async func :fire:

const run = async () =>{

    // ily cnb
    const acnts = readdirSync("./src/other/accounts").filter(file => file.endsWith(`.json`));
    for(const u of acnts) {
        try {
            const a: Account = await require(`./other/accounts/${u}`) 
            accounts.set(a.name, a); 
            log(`found account ${a.name}`, 4, "shell", true)
        } catch(e) {
            log(`loading accounts failed:`, 2, "shell", true, true)
            console.error(e)
            continue
        }
    }

    // why not use stylesetup if we can
    rl.question(styleSetup(cfg.login.q.name), async (name) =>{

        const acnt = accounts.get(name)
        if(!acnt) if(name.toLowerCase() === cfg.login.newAccountCmd){newUserProc()}else{log(cfg.login.accountMissingMsg, 1, "shell", true); run()}else{

            isInputVisible = false
            process.stdout.write(styleSetup(cfg.login.q.password))
            rl.question("", (password) =>{

                process.stdout.write("\n") // goofy workaround
                isInputVisible = true
                if(compareSync(password, acnt?.password)) return shell(rl, acnt)
                run()
            })
        }
    })
}

const newUserProc = async () =>{

    rl.question(cfg.newAcc.q.name, (name) =>{

        if(accounts.get(name)){log(cfg.newAcc.exists, 1, "shell", true); return run()}
        if(name.toLowerCase() === cfg.login.newAccountCmd){log(cfg.newAcc.exists, 1, "shell", true); return run()}

        rl.question(cfg.newAcc.q.pswd, (pswd) =>{

            rl.question(cfg.newAcc.q.token, (token) =>{

                var newUser = {

                    name: name,
                    password: pswd,
                    token: token
                }
                console.log(newUser)
                rl.question(cfg.newAcc.q.confirm, async (answer) =>{

                    const salt = await genSalt(10)
                    const password = await hash(pswd, salt)
                    newUser = {

                        name: name,
                        password: password,
                        token: token
                    }
                    if(answer.toLowerCase() === "y" || "yes"){

                        await appendFileSync(`./src/other/accounts/${name.replace('/', "_")}.json`, JSON.stringify(newUser))
                        log(`finished saving user ${name}`, 4, "shell", true, true)
                    }
                    return run()
                })
            })
        })
    })
}

// random rl stuff, feel free to ignore
rl.on("close", () =>{log("readline was closed", 1, "shell", true)})
rl.on("pause", () =>{log("readline was paused", 1, "shell, true")})
run()