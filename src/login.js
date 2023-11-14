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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var log_1 = __importDefault(require("./other/log"));
var readline_1 = require("readline");
var stream_1 = require("stream");
var styleSetup_1 = __importDefault(require("./other/styleSetup"));
var shell_json_1 = __importDefault(require("./configs/shell.json"));
var bcrypt_1 = require("bcrypt");
var fs_2 = require("fs");
var shell_1 = __importDefault(require("./shell"));
// useful for passwords
var isInputVisible = true;
var stdoutPremium = new stream_1.Writable({
    write: function (chunk, encoding, callback) {
        if (isInputVisible) {
            process.stdout.write(chunk, encoding);
        }
        callback();
    }
});
var rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: stdoutPremium,
    terminal: true
});
var accounts = new Map();
// i have no clue why it won't work unless i put it in an async func :fire:
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var acnts, _i, acnts_1, u, a, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                acnts = (0, fs_1.readdirSync)("./src/other/accounts").filter(function (file) { return file.endsWith(".json"); });
                _i = 0, acnts_1 = acnts;
                _a.label = 1;
            case 1:
                if (!(_i < acnts_1.length)) return [3 /*break*/, 6];
                u = acnts_1[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Promise.resolve("".concat("./other/accounts/".concat(u))).then(function (s) { return __importStar(require(s)); })];
            case 3:
                a = _a.sent();
                accounts.set(a.default.name, a.default);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                (0, log_1.default)("loading accounts failed \n ".concat(e_1), 2, "shell", true, true);
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6:
                // why not use stylesetup if we can
                rl.question((0, styleSetup_1.default)(shell_json_1.default.login.q.name), function (name) {
                    var acnt = accounts.get(name);
                    if (!acnt)
                        if (name.toLowerCase() === shell_json_1.default.login.newAccountCmd) {
                            newUserProc();
                        }
                        else {
                            (0, log_1.default)(shell_json_1.default.login.accountMissingMsg, 1, "shell", true);
                            run();
                        }
                    isInputVisible = false;
                    process.stdout.write((0, styleSetup_1.default)(shell_json_1.default.login.q.password));
                    rl.question("", function (password) {
                        process.stdout.write("\n"); // goofy workaround
                        isInputVisible = true;
                        if ((0, bcrypt_1.compareSync)(password, acnt === null || acnt === void 0 ? void 0 : acnt.password))
                            return (0, shell_1.default)(rl);
                        run();
                    });
                });
                return [2 /*return*/];
        }
    });
}); };
var newUserProc = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        rl.question(shell_json_1.default.newAcc.q.name, function (name) {
            if (accounts.get(name)) {
                (0, log_1.default)(shell_json_1.default.newAcc.exists, 1, "shell", true);
                return run();
            }
            if (name.toLowerCase() === shell_json_1.default.login.newAccountCmd) {
                (0, log_1.default)(shell_json_1.default.newAcc.exists, 1, "shell", true);
                return run();
            }
            rl.question(shell_json_1.default.newAcc.q.pswd, function (pswd) {
                rl.question(shell_json_1.default.newAcc.q.token, function (token) {
                    var newUser = {
                        name: name,
                        password: pswd,
                        token: token
                    };
                    console.log(newUser);
                    rl.question(shell_json_1.default.newAcc.q.confirm, function (answer) { return __awaiter(void 0, void 0, void 0, function () {
                        var salt, password;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, bcrypt_1.genSalt)(10)];
                                case 1:
                                    salt = _a.sent();
                                    return [4 /*yield*/, (0, bcrypt_1.hash)(pswd, salt)];
                                case 2:
                                    password = _a.sent();
                                    newUser = {
                                        name: name,
                                        password: password,
                                        token: token
                                    };
                                    if (!(answer.toLowerCase() === "y" || "yes")) return [3 /*break*/, 4];
                                    return [4 /*yield*/, (0, fs_2.appendFileSync)("./src/other/accounts/".concat(name.replace('/', "_"), ".json"), JSON.stringify(newUser))];
                                case 3:
                                    _a.sent();
                                    (0, log_1.default)("finished saving user ".concat(name), 4, "shell", true, true);
                                    _a.label = 4;
                                case 4: return [2 /*return*/, run()];
                            }
                        });
                    }); });
                });
            });
        });
        return [2 /*return*/];
    });
}); };
rl.on("close", function () {
    (0, log_1.default)("readline was closed", 1, "shell", true);
});
run();
