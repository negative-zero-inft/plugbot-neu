/* eslint-disable indent */
// this file won't get bloated at all
import * as logConf from "../configs/logs.json";
import colors from "chalk";
import { appendFile } from "fs";
import Color from "color";
import os from "os";

export function isValidSnowflake(id: string | number | bigint): boolean {
    id = id.toString();

    return /[0-9]{19,}/.test(id);
}

export function styleSetup(tosetup: string, username?: string) {

    let totalmem = os.totalmem();
    let freemem = os.freemem();

    totalmem = totalmem / 1024 / 1024 / 1024;
    freemem = freemem / 1024 / 1024 / 1024;

    const freememgb = Math.round(freemem * 1);
    const totalmemgb = Math.round(totalmem * 1);

    const cpus = os.cpus();

    const cpumodel = cpus[0].model;

    const ostype = os.type;

    const cpuarch = os.arch;

    const cpuclock = cpus[0].speed;

    const hostname = os.hostname;

    const date_ob = new Date();

    const date = ("0" + date_ob.getDate()).slice(-2);

    // current month

    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year

    const year = date_ob.getFullYear();

    // current hours

    const hours = date_ob.getHours();

    // current minutes

    const _minutes = date_ob.getMinutes();

    const minutes = _minutes.toString().length == 0 ? "0" + _minutes.toString() : _minutes;

    // current seconds

    const seconds = date_ob.getSeconds();

    const finishedproduct = tosetup
        .replace(/'DY'/g, `${year}`)
        .replace(/'DD'/g, `${date}`)
        .replace(/'DM'/g, `${month}`)
        .replace(/'DH'/g, `${hours}`)
        .replace(/'DMI'/g, `${minutes}`)
        .replace(/'DS'/g, `${seconds}`)
        .replace(/'N'/g, "\n")
        .replace(/'FM'/g, `${freememgb}`)
        .replace(/'AM'/g, `${totalmemgb}`)
        .replace(/'CPUM'/g, cpumodel)
        .replace(/'OSTYPE'/g, ostype)
        .replace(/'CPUARCH'/g, cpuarch)
        .replace(/'CPUCLOCK'/g, `${cpuclock}`)
        .replace(/'U'/g, username || "unknown")
        .replace(/'HN'/g, hostname);

    return finishedproduct;
}

enum LOGLEVEL {
    SAY_GEX = -1,
    STANDARD = 0,
    WARN,
    ERROR,
    CRIT,
    SUCCESS
}

export function log(text: string, level: LOGLEVEL, appname: string, display?: boolean, saveFile?: boolean, username?: string) {

    if (!username) username = "no user";
    let logMsg: string = styleSetup(logConf.body, username);
    logMsg = logMsg.replace("'LT'", logConf.symbols[level]).replace("'LOG'", text).replace("'USER'", username).replace("'APP'", appname);
    if (display) {

        switch (level) {
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

    if (saveFile) {
        // that's how we decide the file 
        appendFile(`./logs/${appname}.txt`, `\n ${logMsg}`, () => { });
    }
}

// oh :3 <3
export function colorConverter(color: string | number): number { 
    return Color(color).rgbNumber()
}


// used for buttons' custom id to prevent from duplicate trigger
export function uniqueID(length: number) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
    }
    return result;
}