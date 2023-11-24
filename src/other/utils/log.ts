import styleSetup from "./styleSetup";
import * as logConf from "../../configs/logs.json";
import colors from "chalk";
import { appendFile } from "fs";

enum LOGLEVEL {
    SAY_GEX = -1,
    STANDARD = 0,
    WARN,
    ERROR,
    CRIT,
    SUCCESS
}

export default (text: string, appname: string, optional?: {

    display?: boolean,
    saveFile?: boolean,
    username?: string,
    level?: LOGLEVEL
}) => {

    var username: string = optional?.username || "no user";
    let logMsg: string = styleSetup(logConf.body, optional?.username);
    logMsg = logMsg.replace("'LT'", logConf.symbols[optional?.level || 0]).replace("'LOG'", text).replace("'USER'", username).replace("'APP'", appname);
    if (optional?.display) {

        switch (optional?.level) {
            case LOGLEVEL.SAY_GEX:
                console.log("why did you input a negative number into this"); // shh
                break;

            case LOGLEVEL.STANDARD:
                console.log(logMsg);
                break;

            case LOGLEVEL.WARN:
                console.warn(colors.yellow(logMsg));
                break;

            case LOGLEVEL.ERROR:
                console.error(colors.red(logMsg));
                break;

            case LOGLEVEL.CRIT:
                console.error(colors.bgRed(logMsg));
                break;

            case LOGLEVEL.SUCCESS:
                console.log(colors.green(logMsg));
                break;

            default:
                console.log(logMsg);
                break;
        }
    }

    if (optional?.saveFile) {
        // that's how we decide the file 
        appendFile(`./logs/${appname}.txt`, `\n ${logMsg}`, () => { });
    }
};