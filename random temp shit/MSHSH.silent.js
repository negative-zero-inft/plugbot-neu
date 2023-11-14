// you need to make the filename have .app.js for the app to be usable from the CMDLINE

// info about the app, required for it to run

const name = "MSHSH"
const desc = "the heart of -SH"
const version = "0.0.1"
const usage = "set as the default shell it in globalConf"

// the function that gets executed

const exec = (user, oldRl, programs) =>{

    // close that rl

    oldRl.close()

    // any libs you might need

    const NZTK = require("../other/NZTK")
    const nztk = new NZTK(name, user)
    const fs = require('fs')

    // readline stuff
    // the writable part is so that you can disable stdout when for example entering a password
    // buuut it will also disable rl.question() output so you should reenable it
    // unless you just like abusing console.log()

    var Writable = require('stream').Writable;
    var mutableStdout = new Writable({

        muted: false,
        write: (chunk, encoding, callback) =>{

            if(!this.muted){

                process.stdout.write(chunk, encoding);
            }
            callback();
        }
    });

    // any configs you might need

    const globalConf = require('../configs/globalConf.json')
    const shellConf = require('../configs/MSHSHConf.json')

    // the entirety of your code

    const apps = new Map()
    const users = new Map()

    // i don't want caching of apps

    const noncache = (module) =>{

        require("fs").watchFile(require("path").resolve(module), () =>{
    
            delete require.cache[require.resolve(module)]
        })
    }
    
    // get the users

    const usrs = fs.readdirSync(`./SHELL/other/users/`).filter(file => file.endsWith(`.json`));
    for(const file of usrs){

        const usr = require(`../other/users/${file}`);
    
        users.set(usr.name, usr)
    }

    // get the apps

    try{

        const usrs = fs.readdirSync(`./SHELL/other/users/`).filter(file => file.endsWith(`.json`));
        for(const file of usrs){

            const usr = require(`../other/users/${file}`);
        
            users.set(usr.name, usr)
        }
    }catch(err){}

    try{

        const cmds = fs.readdirSync(`./SHELL${globalConf.programs.path}`).filter(file => file.endsWith(`.app.js`));
        for(const file of cmds){

            noncache(`..${globalConf.programs.path}/${file}`)
            const cmd = require(`..${globalConf.programs.path}/${file}`);
                
            nztk.log.success(`found app ${cmd.name}`, 2, "start")
        
            apps.set(cmd.name, cmd)
        }
    }catch(err){

        nztk.log.error(`couldn't load apps`, 1, 'start')
    }

    // memory

    const mem = new Map()

    // the stuff that happens after user input

    const ask = async () =>{

        var rl = await require('readline').createInterface({

            input: process.stdin,
            output: mutableStdout,
            terminal: true
        })

        // reload apps

        try{

            const cmds = fs.readdirSync(`./SHELL${globalConf.programs.path}`).filter(file => file.endsWith(`.app.js`));
            for(const file of cmds){
    
                noncache(`..${globalConf.programs.path}/${file}`)
                const cmd = require(`..${globalConf.programs.path}/${file}`);
            
                apps.set(cmd.name, cmd)
            }
        }catch(err){
    
            nztk.log.error(`couldn't load apps`, 1, 'start')
        }
        await nztk.setupPS1(shellConf.PS1, (data) =>{rl.question(data, (line) =>{
    
            // the stuff that happens after enter was pressed

            nztk.log.normal(`entered ${line} into the CMDLINE`, 0, 'history')
    
            // package the stuff nicely

            const primArgs = line.split(" ")
            
            let NZSHHStuff = {

                input: {

                    raw: line,
                    args: primArgs
                },
                users: {

                    current: user,
                    all: users
                },
                appStuff: {

                    apps: apps,
                    allPrograms: programs,
                    readline: rl,
                    mem: mem
                }
            }

            const cmd = apps.get(`${primArgs[0]}`)

            if(cmd){

                try{
                    
                    const r = () =>{

                        console.time(`execution time`)
                        rl.close()
                        cmd.run(NZSHHStuff, (ev) =>{

                            if(ev.exitCode === 0){
    
                                mem.set(ev.name, ev.value)
                            }else{
    
                                nztk.log.error(`program ${ev.name} crashed! reason: ${JSON.stringify(ev.value)}`, 1, 'errors')
                            }

                            // recursivness

                            console.timeEnd(`execution time`)
                            ask()
                        })
                    }

                    r()
                }catch(err){

                    nztk.log.critError(err, 1, 'errors')
                }
            }else{

                nztk.log.error(`couldn't find program ${primArgs[0]}, maybe try using help`, 2, 'a')
                rl.close()
                ask()
            }
        })})
    }
    ask()
}

// export the app

module.exports = {

    name: name,
    desc: desc,
    version: version,
    usage: usage,
    run: exec
}