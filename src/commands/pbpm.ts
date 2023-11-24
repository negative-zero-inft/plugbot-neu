import { CmdTools, pbpmRepo } from "../other/typing";
import repos from "../configs/pbpm/repos.json";
import { log } from "../other/utils";

module.exports = {
    name: "pbpm",
    developers: ["nrd"],
    version: "0.0.1",
    desc: "the plugbot package manager",
    usage: "pbpm [add/install/view/refresh] [package name]",
    run: (tools: CmdTools) =>{
    
        if(!tools.input.args[1]) return log("please input what action to perform", "pbpm", {
            display: true,
            saveFile: false,
            username: tools.account.name,
            level: 1
        })
        switch(tools.input.args[1].toLowerCase()){
            
            case "add":
                // adds a repo
                break;

            case "a":
                // adds a repo
                break;

            case "install":
                // install script
                install(tools);
                break;

            case "i":
                // install script
                install(tools);
                break;

            case "view":
                // view repo
                break

            case "v":
                // view repo
                break

            case "refresh":
                // refresh repos
                break

            case "r":
                // refresh repos
                break

            default:
                log("the only options are add (a) and install (i)", "pbpm", {
                    display: true,
                    saveFile: false,
                    username: tools.account.name,
                    level: 1
                })
                break
        }
    }
};

const install = (tools: CmdTools) =>{

    var pkgLink: string | undefined
    repos.forEach((r: pbpmRepo) =>{

        if(r.packages.find(x =>x.name === tools.input.args[2])){

            pkgLink = r.packages.find(x =>x.name === tools.input.args[2])?.link
            log(`found package ${tools.input.args[2]}. address: ${pkgLink}`, "pbpm", {

                display: true,
                level: 4,
                username: tools.account.name
            });
        }
    })
}