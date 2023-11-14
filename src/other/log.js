"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styleSetup_1 = __importDefault(require("./styleSetup"));
var logs_json_1 = __importDefault(require("../configs/logs.json"));
var cli_colors_1 = __importDefault(require("cli-colors"));
var fs_1 = require("fs");
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
    var logMsg = (0, styleSetup_1.default)(logs_json_1.default.body, username);
    logMsg = logMsg.replace("'LT'", logs_json_1.default.symbols[level]).replace("'LOG'", text).replace("'USER'", username).replace("'APP'", appname);
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
        (0, fs_1.appendFile)("./src/logs/".concat(appname, ".txt"), "\n ".concat(logMsg), function () { });
    }
}
exports.default = print;
