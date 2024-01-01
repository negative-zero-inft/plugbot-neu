// this removes a repo not a package
// oh my fucking god yes it's gonna be ez
// btw i have an idea on how to redo the argument system
// i could quickly cobble it together :3
import { writeFile } from "fs";
import { CmdTools, pbpmRepo } from "../typing";
import { JSONrequire, log } from "../utils";
import simpleGit, { SimpleGitOptions } from "simple-git";

export default function add(tools: CmdTools, repos: pbpmRepo[]) {

    if (!tools.input.args[2]) return log("please input the repo to remove", "pbpm", {
        username: tools.account.name,
        level: 1
    });
    const options: Partial<SimpleGitOptions> = {
        baseDir: "./temp/",
        binary: "git",
        maxConcurrentProcesses: 6,
        trimmed: false,
    };
    const git = simpleGit(options);
    git.clone(tools.input.args[2], "pbpm", {}, (err) => {

        if (err) {

            log(`failed to fetch the repo at ${tools.input.args[2]}:`, "pbpm", {
                saveFile: true,
                username: tools.account.name,
                level: 2
            });
            console.error(err);
            return;
        }
        const repo: pbpmRepo = JSONrequire("../../temp/pbpm/repo.json");
        if (repos.find(x => x.id === repo.id)) return log(`the repo with the id ${repo.id} has been installed already.`, "pbpm", {
            username: tools.account.name,
            level: 1
        });
        tools.cmdTools.rl.question(`you're about to add ${repo.name}. continue? [Y/N] `, (a) => {

            if (["y", "yes"].includes(a.toLowerCase())) return log("cancelling the addition of the repo", "pbpm", { username: tools.account.name, });
        });
        repos.push(repo);
        writeFile("./userSpace/repos.json", JSON.stringify(repos), (err) => {

            if (err) {

                log("couldn't save new repo:", "pbpm", {
                    username: tools.account.name,
                    level: 2
                });
                console.error(err);
            }
            tools.cmdTools.mem.set("pbpm", {

                lastAction: "remove"
            });
        });
    });
}