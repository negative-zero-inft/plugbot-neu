import { Client, Interaction } from "discord.js"
import { Interface } from "readline"

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
        args: string[]
    },
    cmdTools: {
        rl: Interface,
        mem: Map<any, any>
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
    exec: (tools: PluginCmdTools) => void
}

export interface Plugin {
    name: string
    cmds?: PluginCommand[]
    developers: Array<string>
    version: number
    cmdLoader?: () => PluginCommand[] | Promise<PluginCommand[]>
    run: (tools: PluginTools) => void
}

export interface Command {
    name: string
    developers: Array<string>
    version: number
    usage: string
    desc: string
    run: (tools: CmdTools) => void
}