import { CmdTools, pbpmRepo } from "../other/typing";
import repos from "../configs/pbpm/repos.json";
import { log } from "../other/utils";
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import { mkdirSync, rmdirSync, writeFile, writeFileSync } from "fs";

module.exports = {
    name: "pbpm",
    developers: ["nrd"],
    version: "0.0.1",
    desc: "the plugbot package manager",
    usage: "pbpm [add/install/view/refresh] [package name]",
    run: (tools: CmdTools) => {

        if (!tools.input.args[1]) return log("please input what action to perform", "pbpm", {
            display: true,
            saveFile: false,
            username: tools.account.name,
            level: 1
        })
        if (repos.length === 0) log("no pbpm repos detected. consider adding the default -0 repository\npbpm a https://github.com/negative-zero-inft/pbpmRepo", "pbpm", {
            display: true,
            saveFile: false,
            username: tools.account.name,
            level: 1
        })
        switch (tools.input.args[1].toLowerCase()) {

            case "add":
                // adds a repo
                add(tools);
                break;

            case "a":
                // adds a repo
                add(tools);
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
                refresh(tools);
                break

            case "r":
                // refresh repos
                refresh(tools);
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

const install = (tools: CmdTools) => {

    // TODO
    var pkgLink: string | undefined
    repos.forEach((r: pbpmRepo) => {

        if (r.packages.find(x => x.name === tools.input.args[2])) {

            pkgLink = r.packages.find(x => x.name === tools.input.args[2])?.link
            log(`found package ${tools.input.args[2]}. address: ${pkgLink}`, "pbpm", {

                display: true,
                level: 4,
                username: tools.account.name
            });
        }
    })
}

const add = (tools: CmdTools) => {

    if (!tools.input.args[2]) return log("please input the repo to add", "pbpm", {
        display: true,
        saveFile: false,
        username: tools.account.name,
        level: 1
    })
    const options: Partial<SimpleGitOptions> = {
        baseDir: `./temp/`,
        binary: 'git',
        maxConcurrentProcesses: 6,
        trimmed: false,
    };
    const git: SimpleGit = simpleGit(options);
    git.clone(tools.input.args[2], "pbpm", {}, (err) => {

        if (err) {

            log(`failed to fetch the repo at ${tools.input.args[2]}:`, "pbpm", {
                display: true,
                saveFile: true,
                username: tools.account.name,
                level: 2
            })
            console.error(err)
            return
        }
        const repo: pbpmRepo = require('../../temp/pbpm/repo.json')
        console.log(repo)
        //@ts-ignore
        repos.push(repo)
        writeFile("./build/configs/pbpm/repos.json", JSON.stringify(repos), (err) =>{

            if(err){

                log("couldn't save new repo:", "pbpm", {
                    display: true,
                    saveFile: false,
                    username: tools.account.name,
                    level: 2
                })
                console.error(err)
            }
            rmdirSync("./temp/pbpm", { recursive: true })
        })
    }) 
}
const refresh = (tools: CmdTools) => {

    if (repos.length === 0) return log("no repos detected, cannot continue", "pbpm", {
        display: true,
        saveFile: false,
        username: tools.account.name,
        level: 2
    })
    repos.forEach((r: pbpmRepo) => {

        const options: Partial<SimpleGitOptions> = {
            baseDir: `./temp/${r.id}`,
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false,
        };
        const git: SimpleGit = simpleGit(options);
        git.clone(r.repoLink)
        rmdirSync(`./temp/${r.id}`)
    })
}