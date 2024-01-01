import { Client, Interaction } from "discord.js";
import { Interface } from "readline";

export interface Account {
    name: string
    password: string
    token: string
}

export interface PlugBot extends Client {

    plugins: Map<string, Plugin>
}
export interface PluginTools {
    client: PlugBot,
    account: Account
}

export interface CmdTools {
    client: PlugBot,
    input: {
        raw: string,
        args: string[],
        advArgs: Map<string, string>;
    },
    cmdTools: {
        rl: Interface,
        mem: Map<unknown, unknown>
        cmds: Map<string, Command>
    },
    account: Account
}

export interface PluginCmdTools {

    // will complete later
    client: PlugBot
    interaction: Interaction // idk how to make it so that this works with textcmds, something for cnb to figure out ig :3
}

// designed with /cmds in mind, will prob need some changing
export interface PluginCommand {

    name: string
    desc: string
    usage: string
    version: string
    isSlashCmd?: boolean
    exec: (tools: PluginCmdTools) => void | Promise<void>
}

export interface Plugin {
    name: string
    cmds?: PluginCommand[]
    developers: Array<string>
    version: number
    cmdLoader?: (tools: PluginTools) => PluginCommand[] | Promise<PluginCommand[]>
    run: (tools: PluginTools) => void | Promise<void>
}

export interface Command {
    name: string
    developers: Array<string>
    version: number
    usage: string
    desc: string
    run: (tools: CmdTools) => void | Promise<void>
}

export interface pbpmRepo {

    name: string
    id: string
    maintainers: Array<string>
    repoLink: string
    packages: Array<{

        name: string
        link: string
    }>
}

export interface PbpmArgs {
    tools: CmdTools, repos: pbpmRepo[]
}