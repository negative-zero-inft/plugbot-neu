"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.styleSetup = exports.isValidSnowflake = void 0;
// this file won't get bloated at all
const logConf = __importStar(require("../configs/logs.json"));
const cli_colors_1 = __importDefault(require("cli-colors"));
const fs_1 = require("fs");
function isValidSnowflake(id) {
    id = id.toString();
    return /[0-9]{19,}/.test(id);
}
exports.isValidSnowflake = isValidSnowflake;
function styleSetup(tosetup, username) {
    const os = require('os');
    var totalmem = os.totalmem();
    var freemem = os.freemem();
    totalmem = totalmem / 1024 / 1024 / 1024;
    freemem = freemem / 1024 / 1024 / 1024;
    var freememgb = Math.round(freemem * 1);
    var totalmemgb = Math.round(totalmem * 1);
    var cpus = os.cpus();
    var cpumodel = cpus[0].model;
    var ostype = os.type;
    var cpuarch = os.arch;
    var cpuclock = cpus[0].speed;
    var hostname = os.hostname;
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
    let minutes = _minutes.toString().length == 0 ? "0" + _minutes.toString() : _minutes;
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
        .replace(/'HN'/g, hostname);
    return finishedproduct;
}
exports.styleSetup = styleSetup;
var LOGLEVEL;
(function (LOGLEVEL) {
    LOGLEVEL[LOGLEVEL["SAY_GEX"] = -1] = "SAY_GEX";
    LOGLEVEL[LOGLEVEL["STANDARD"] = 0] = "STANDARD";
    LOGLEVEL[LOGLEVEL["WARN"] = 1] = "WARN";
    LOGLEVEL[LOGLEVEL["ERROR"] = 2] = "ERROR";
    LOGLEVEL[LOGLEVEL["CRIT"] = 3] = "CRIT";
    LOGLEVEL[LOGLEVEL["SUCCESS"] = 4] = "SUCCESS";
})(LOGLEVEL || (LOGLEVEL = {}));
function log(text, level, appname, display, saveFile, username) {
    if (!username)
        username = "no user";
    var logMsg = styleSetup(logConf.body, username);
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
                console.warn(cli_colors_1.default.yellow(logMsg));
                break;
            case LOGLEVEL.ERROR:
                console.error(cli_colors_1.default.red(logMsg));
                break;
            case LOGLEVEL.CRIT:
                console.error(cli_colors_1.default.bgRed(logMsg));
                break;
            case LOGLEVEL.SUCCESS:
                console.log(cli_colors_1.default.green(logMsg));
                break;
            default:
                console.log(logMsg);
                break;
        }
    }
    if (saveFile) {
        // that's how we decide the file 
        (0, fs_1.appendFile)(`./src/logs/${appname}.txt`, `\n ${logMsg}`, () => { });
    }
}
exports.log = log;
