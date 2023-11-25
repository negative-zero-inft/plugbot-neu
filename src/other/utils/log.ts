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

interface logOptions {
    display?: boolean
    saveFile?: boolean
    username?: string
    level?: LOGLEVEL
}

export default (text: string, appname: string, optional?: logOptions) => {
    const opt: logOptions = optional || {
        display: true,
        saveFile: false,
        username: "no user",
        level: LOGLEVEL.STANDARD
    };

    // default options 
    if (typeof opt.display == "undefined") opt.display = true;
    if (typeof opt.level == "undefined") opt.level = LOGLEVEL.STANDARD;
    if (typeof opt.saveFile == "undefined") opt.saveFile = false;
    if (typeof opt.username == "undefined") opt.username == "no user";

    const username: string = opt.username || "no user";
    let logMsg: string = styleSetup(logConf.body, username);
    logMsg = logMsg.replace("'LT'", logConf.symbols[opt.level || 0]).replace("'LOG'", text).replace("'USER'", username).replace("'APP'", appname);
    if ((typeof opt.display !== "undefined" && opt.display) || (typeof opt.display == "undefined")) {

        switch (opt?.level) {
            case LOGLEVEL.SAY_GEX:
                console.log(colors.red("why did you input a negative number into this")); // shh
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
                console.error(colors.bgRed(colors.black(logMsg)));
                break;

            case LOGLEVEL.SUCCESS:
                console.log(colors.green(logMsg));
                break;

            default:
                console.log(logMsg);
                break;
        }
    }

    if (opt?.saveFile) {
        // that's how we decide the file 
        appendFile(`./logs/${appname}.txt`, `\n ${logMsg}`, () => { });
    }
};