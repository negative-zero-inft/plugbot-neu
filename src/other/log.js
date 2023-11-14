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
const styleSetup_js_1 = __importDefault(require("./styleSetup.js"));
const logConf = __importStar(require("../configs/logs.json"));
const cli_colors_1 = __importDefault(require("cli-colors"));
const fs_1 = require("fs");
var LOGLEVEL;
(function (LOGLEVEL) {
    LOGLEVEL[LOGLEVEL["SAY_GEX"] = -1] = "SAY_GEX";
    LOGLEVEL[LOGLEVEL["STANDARD"] = 0] = "STANDARD";
    LOGLEVEL[LOGLEVEL["WARN"] = 1] = "WARN";
    LOGLEVEL[LOGLEVEL["ERROR"] = 2] = "ERROR";
    LOGLEVEL[LOGLEVEL["CRIT"] = 3] = "CRIT";
    LOGLEVEL[LOGLEVEL["SUCCESS"] = 4] = "SUCCESS";
})(LOGLEVEL || (LOGLEVEL = {}));
function print(text, level, appname, display, saveFile, username) {
    if (!username)
        username = "no user";
    var logMsg = (0, styleSetup_js_1.default)(logConf.body, username);
    logMsg = logMsg.replace("'LT'", logConf.symbols[level]).replace("'LOG'", text).replace("'USER'", username).replace("'APP'", appname);
    if (display) {
        switch (level) {
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
exports.default = print;
