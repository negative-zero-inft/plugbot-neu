// this file won"t get bloated at all
import Color from "color";
import ss from "./utils/styleSetup";
import lg from "./utils/log";
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import { Console } from "console";
import { Transform } from "stream";

export enum LOGLEVEL {
    SAY_GEX = -1,
    STANDARD = 0,
    WARN,
    ERROR,
    CRIT,
    SUCCESS
}

export function isValidSnowflake(id: string | number | bigint): boolean {
    id = id.toString();

    return /[0-9]{19,}/.test(id);
}

export function styleSetup(toSetup: string, username?: string) {

    return ss(toSetup, username);
}

export function log(text: string, appName: string, optional: {

    display?: boolean,
    saveFile?: boolean,
    username?: string,
    level?: LOGLEVEL
} = {
        display: true,
        saveFile: false,
        username: "no user",
        level: LOGLEVEL.STANDARD
    }) {
    lg(text, appName, optional);
}

export function colorConverter(color: string | number): number {
    return Color(color).rgbNumber();
}

// used for buttons" custom id to prevent from duplicate trigger
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


// Better than using require() to load JSON stuff
export function JSONrequire<T>(path: string) {
    return JSON.parse(readFileSync(join(__dirname, path)).toString()) as T;
}

export async function asyncJSONrequire<T>(path: string) {
    return JSON.parse((await readFile(join(__dirname, path))).toString()) as T;
}

export function table(input: Array<unknown>) {

    const ts = new Transform({ transform(chunk, _, cb) { cb(null, chunk); } });
    const logger = new Console({ stdout: ts });
    logger.table(input);
    const table = (ts.read() || "").toString();
    let result = "";
    for (const row of table.split(/[\r\n]+/)) {
        let r = row.replace(/[^┬]*┬/, "┌");
        r = r.replace(/^├─*┼/, "├");
        r = r.replace(/│[^│]*/, "");
        r = r.replace(/^└─*┴/, "└");
        r = r.replace(/"/g, " ");
        result += `${r}\n`;
    }
    return result;
}