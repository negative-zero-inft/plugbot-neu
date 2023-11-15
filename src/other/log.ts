import setupText from "./styleSetup.cjs";
import * as logConf from "../configs/logs.json"
import colors from "cli-colors"
import { appendFile } from "fs";

enum LOGLEVEL  {
    SAY_GEX = -1,
    STANDARD = 0,
    WARN,
    ERROR,
    CRIT,
    SUCCESS 
}   

export default function print(text: string, level: LOGLEVEL, appname: string, display?: boolean, saveFile?: boolean, username?: string) {
    
    if(!username) username = "no user"
    var logMsg: string = setupText(logConf.body, username)
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