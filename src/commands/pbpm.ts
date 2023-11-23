import { CmdTools } from "../other/typing";
import * as repos from "../configs/pbpm/repos.json";
import { log } from "../other/utils";

module.exports = {
    name: "pbpm",
    developers: ["nrd"],
    version: "0.0.1",
    desc: "the plugbot package manager",
    usage: "pbpm [a/i/u/r] [package name]",
    run: (tools: CmdTools) =>{
    
        if(!tools.input.args[1]) return log("please input what action you want to perform", 1, "pbpm", true);
        switch(tools.input.args[1].toLowerCase()){
            
        case "add":
            // adds a repo
            break;

        case "a":
            // adds a repo
            break;
        }
    }
};