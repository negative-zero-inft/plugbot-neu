"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../other/log");
module.exports = {
    name: "test plugin in ts",
    developers: ["NRD"],
    version: "0.0.1",
    run: function (tools) {
        (0, log_1.default)("ts plugin works", 4, "testPlugin", true);
    }
};
