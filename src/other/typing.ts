import { Client } from "discord.js"
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

export interface Plugin{
    name: string
    developers: Array<string>
    version: number
    run: (tools: PluginTools) => void 
}

export interface Command{
    name: string
    developers: Array<string>
    version: number
    usage: string
    run: (tools: CmdTools) => void
}