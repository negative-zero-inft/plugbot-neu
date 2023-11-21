import { Client, Interaction } from "discord.js"
import { PlugBot } from "./client"
import { Interface } from "readline"

export interface Account {
    name: string
    password: string
    token: string
}

export interface PluginTools {
    client: Client,
    account: Account
}

export interface CmdTools {
    client: Client,
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
    client: Client
    interaction: Interaction
}

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
    cmdLoader?: () => PluginCommand[]
    run: (tools: PluginTools) => void
}

export interface Command {
    name: string
    developers: Array<string>
    version: number
    usage: string
    run: (tools: CmdTools) => void
}