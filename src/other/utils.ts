// this file won't get bloated at all
import * as logConf from "../configs/logs.json"
import colors from "cli-colors"
import { appendFile } from "fs";

export function isValidSnowflake(id: string | number | bigint): boolean {
    id = id.toString()

    return /[0-9]{19,}/.test(id)
}

export function styleSetup (tosetup: string, username?: string){

    const os = require('os')

    var totalmem = os.totalmem()
    var freemem = os.freemem()
            
    totalmem = totalmem / 1024 / 1024 / 1024
    freemem = freemem / 1024 / 1024 / 1024
            
    var freememgb = Math.round(freemem * 1)
    var totalmemgb = Math.round(totalmem * 1)
            
    var cpus = os.cpus()
            
    var cpumodel = cpus[0].model
            
    var ostype = os.type

    var cpuarch = os.arch

    var cpuclock = cpus[0].speed

    var hostname = os.hostname

    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
        
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
    // current year

    let year = date_ob.getFullYear();
        
    // current hours

    let hours = date_ob.getHours();
        
    // current minutes
    
    let _minutes = date_ob.getMinutes();
        
    let minutes = _minutes.toString().length == 0 ? "0" + _minutes.toString() : _minutes

    // current seconds

    let seconds = date_ob.getSeconds();
    
    const finishedproduct = tosetup
    .replace(/'DY'/g, `${year}`)
    .replace(/'DD'/g, `${date}`)
    .replace(/'DM'/g, `${month}`)
    .replace(/'DH'/g, `${hours}`)
    .replace(/'DMI'/g, `${minutes}`)
    .replace(/'DS'/g, `${seconds}`)
    .replace(/'N'/g, `\n`)
    .replace(/'FM'/g, `${freememgb}`)
    .replace(/'AM'/g, `${totalmemgb}`)
    .replace(/'CPUM'/g, cpumodel)
    .replace(/'OSTYPE'/g, ostype)
    .replace(/'CPUARCH'/g, cpuarch)
    .replace(/'CPUCLOCK'/g, cpuclock)
    .replace(/'U'/g, username)
    .replace(/'HN'/g, hostname)

    return finishedproduct
}

enum LOGLEVEL  {
    SAY_GEX = -1,
    STANDARD = 0,
    WARN,
    ERROR,
    CRIT,
    SUCCESS 
}   

export function log(text: string, level: LOGLEVEL, appname: string, display?: boolean, saveFile?: boolean, username?: string) {
    
    if(!username) username = "no user"
    var logMsg: string = styleSetup(logConf.body, username)
    logMsg = logMsg.replace("'LT'", logConf.symbols[level]).replace("'LOG'", text).replace("'USER'", username).replace("'APP'", appname)
    if(display) {
        
        switch(level){

            case LOGLEVEL.SAY_GEX:
                console.log("why did you input a negative number into this") // shh
                break

            case LOGLEVEL.STANDARD:
                console.log(logMsg)
                break

            case LOGLEVEL.WARN: 
                console.warn(colors.yellow(logMsg))
                break

            case LOGLEVEL.ERROR:
                console.error(colors.red(logMsg))
                break

            case LOGLEVEL.CRIT:
                console.error(colors.bgRed(logMsg))
                break

            case LOGLEVEL.SUCCESS:
                console.log(colors.green(logMsg))
                break

            default:
                console.log(logMsg)
                break
        }
    }

    if(saveFile){
        // that's how we decide the file 
        appendFile(`./src/logs/${appname}.txt`, `\n ${logMsg}`, () =>{})
    }
}