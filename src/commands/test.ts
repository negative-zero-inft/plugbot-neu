import log from "../other/log"

module.exports = {

    name: "test",
    developers: ["nrd"],
    version: "0.0.1",
    run: (tools) =>{

        log("works well", 4, tools.account.name, true)
    }
}