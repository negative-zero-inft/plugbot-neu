// you need to make the filename have .app.js for the app to be usable from the CMDLINE

// info about the app, required for it to run

const name = "MSHLM"
const desc = "login manager for minus shell"
const version = "0.0.1"
const usage = "set as the default login manager it in globalConf"

// the function that gets executed

const exec = (programs) =>{

    // any libs you might need

    const fs = require('fs')
    const NZTK = require("../other/NZTK")
    // const nztk = new NZTK(name, NZSHHStuff.users.current)
    const nztk = new NZTK(name, { name: "none", password: "none" })
    const Writable = require('stream').Writable;
    const mutableStdout = new Writable({

        muted: false,
        write: function(chunk, encoding, callback){

            if(!this.muted){

                process.stdout.write(chunk, encoding);
            }
            callback();
        }
    });
    const bcrypt = require('bcrypt')

    // any configs you might need

    const globalConf = require('../configs/globalConf.json')

    // the entirety of your code

    
    // load and login

    const users = new Map()
    
    try{
        
        var rl = require('readline').createInterface({

            input: process.stdin,
            output: mutableStdout,
            terminal: true
        })
        const usrs = fs.readdirSync(`./SHELL/other/users/`).filter(file => file.endsWith(`.json`));
        for(const file of usrs){

            const usr = require(`../other/users/${file}`);
            
            nztk.log.success(`found user ${usr.name}`, 2, "MSHLM")
        
            users.set(usr.name, usr)

            if(usr.auto){

                nztk.log.warn(`AUTOMATICALLY LOGGED IN TO ${usr.name}, PLEASE CHANGE auto TO false IN /SHELL/other/users/${file} IF YOU WANT TO REMOVE THIS`, 2, '')
                return programs.get(globalConf.defaults.shell.name).run(usr, rl, programs)
            }
        }
        
        // the stuff that happens after user input
    
        nztk.setupPS1(`please input your username (or NEW to create new user) `, (data) =>{rl.question(data, (answer) =>{
            
            // the stuff that happens after enter was pressed
            
            answer = answer.replace(/ /g, '')
            
            // create a new user if new (or NEW) is entered
            
            if(answer.toLowerCase() === 'new'){
                
                createNewUser()
            }else{
                
                // log in
                
                const user = users.get(answer)
                
                // create a new user if no user named (input here) found
                
                if(!user){
                    
                    nztk.log.error(`no user named ${answer} found`, 2, '')
                    rl.question(`do you want to create a new user? [Y/N] `, (ans) =>{
                        
                        if(ans.toLowerCase().replace(/ /g, '') === `y`){

                            createNewUser()
                        }else{
                            
                            exec(programs, rl)
                        }
                    })
                }else{
                    
                    // password checking

                    const ask4Pswd = () =>{
                        
                        process.stdout.write(`please input your password `)
                        mutableStdout.muted = true
                        rl.question('', (pswd) =>{
                            
                            if(bcrypt.compareSync(pswd, user.password)){
                                
                                programs.get(globalConf.defaults.shell.name).run(user, rl, programs)
                            }else{
    
                                nztk.log.warn(`incorrect password`, 2, '')
                                ask4Pswd()
                            }
                        })
                    }
                    ask4Pswd()
                }
            }
        })})
    }catch(err){
        
        nztk.log.error(`${err}`, 1, 'MSHLM')
        console.log(err)
    }

    // create a new user

    const createNewUser = () =>{
        
        rl.question('what do you want to name the user? ', (a0) =>{

            a0 = a0.replace(/ /g, '_')
            nztk.log.normal(`the user will be called ${a0}.`, 2, 'a')
            process.stdout.write('please input the password ')
            mutableStdout.muted = true
            rl.question('please input the password', (a1) =>{

                mutableStdout.muted = false
                rl.question('do you want to automatically log into this user? [Y/N] ', (a2) =>{

                    // this is stupid but im on the highest levels of lazyness, writing this comment instead of fixing it (:

                    switch(a2.toLowerCase()){

                        case "y":
                            const r = async () =>{
                                
                                const salt = await bcrypt.genSalt(10)
                                const password = await bcrypt.hash(a1, salt)
                                const newUserA = await {

                                    name: a0,
                                    password: password,
                                    auto: true
                                }
                                await fs.unlink(`./SHELL/other/users/${a0}.json`, (err) =>{})
                                await fs.appendFile(`./SHELL/other/users/${a0}.json`, JSON.stringify(newUserA), (err) =>{

                                    nztk.log.error(`${err}`, 1, 'create')
                                })
                                console.clear()
                                exec(programs, rl)
                            }
                            r()
                            break
                            
                        default:
                            const t = async () =>{
                                
                                const salt = await bcrypt.genSalt(10)
                                const password = await bcrypt.hash(a1, salt)
                                const newUserA = await {

                                    name: a0,
                                    password: password,
                                    auto: false
                                }
                                await fs.unlink(`./SHELL/other/users/${a0}.json`, (err) =>{})
                                await fs.appendFile(`./SHELL/other/users/${a0}.json`, JSON.stringify(newUserA), (err) =>{

                                    nztk.log.error(`${err}`, 1, 'create')
                                })
                                console.clear()
                                exec(programs, rl)
                            }
                            t()
                            break
                    }
                })
            })
        })
    }
    
    // after the readline is closed
    
    rl.on('close', () =>{

        nztk.log.warn('readline was closed', 2, 'a')
    })
}

// export the app

module.exports = {

    name: name,
    desc: desc,
    version: version,
    usage: usage,
    run: exec
}