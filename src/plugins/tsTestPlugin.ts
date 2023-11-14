import log from "../other/log"

module.exports = {

    name: "test plugin in ts",
    developers: ["NRD"],
    version: "0.0.1",
    run: (tools) =>{

        log("ts plugin works", 4, "testPlugin", true)
    }
}