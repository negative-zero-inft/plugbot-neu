import { CmdTools, pbpmRepo } from "../other/typing";
import { JSONrequire, LOGLEVEL, log } from "../other/utils";
import install from "../other/pbpm/install";
// import refresh from "../other/pbpm/refresh";
import add from "../other/pbpm/add";


module.exports = {
    name: "pbpm",
    developers: ["nrd", "catnowblue"],
    version: "0.0.2",
    desc: "the plugbot package manager",
    usage: "pbpm [add/install/view/refresh/list] [package name]",
    run: async (tools: CmdTools) => {

        let repos: pbpmRepo[];
        try {
            repos = JSONrequire("../../userSpace/repos.json");
        } catch {
            // if repos.json file failed to load, we just set it to empty array
            repos = [];
            log("The file repo.json couldn't load or doesn't exist.", "pbpm", { display: true, username: tools.account.name, level: LOGLEVEL.WARN });
        }

        if (!tools.input.args[1]) return log("please input what action to perform", "pbpm", {
            username: tools.account.name,
            level: 1
        });

        function noLogRepoError() {
            return log("no pbpm repos detected. consider adding the default -0 repository\npbpm a https://github.com/negative-zero-inft/pbpmRepo", "pbpm", {
                username: tools.account.name,
                level: 1
            });
        }

        let noRepos: boolean = false;
        if (repos.length === 0) noRepos = true;

        switch (tools.input.args[1].toLowerCase()) {
            case "a":
            case "add":
                // adds a repo
                add(tools, repos);
                break;

            case "i":
            case "install":
                if (noRepos) return noLogRepoError();
                // install script
                install();
                break;

            case "v":
            case "view":
                if (noRepos) return noLogRepoError();
                // view repos
                view();
                break;

            case "r":
            case "refresh":
                if (noRepos) return noLogRepoError();
                // refresh repos
                // refresh(tools, repos);
                break;

            case "l":
            case "list":
                if (noRepos) return noLogRepoError();
                // list packages for each repo
                list();
                break;

            default:
                log("you can input add (a), refresh (r), view (v), list (l) and install (i)", "pbpm", {
                    username: tools.account.name,
                    level: 1
                });
                break;
        }
    }
};

const list = () => {


};

const view = () => {


};