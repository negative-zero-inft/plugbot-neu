module.exports = {

    name: "test plugin in js",
    developers: ["NRD"],
    version: "0.0.1",
    run: (tools) =>{

        const log = require('../other/log').default
        log("js plugin works", 4, "testPlugin", true)
    }
}