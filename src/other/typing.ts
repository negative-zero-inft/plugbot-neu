import { Client } from "discord.js"
import { Interface } from "readline"

export interface Account {
    name: string
    password: string
    token: string
} 

export interface PluginTools {
    client: Client,
    account: Account
    // i just realized plugins don't need rl
}
export interface CmdTools {
    client: Client,
    rl: Interface,
    account: Account
    // i just realized plugins don't need rl
}
export interface Plugin{
    // tools are whatever we decide pass down in the future
    name: string
    developers: Array<string>
    version: number
    run: (tools: PluginTools) => void
}
export interface Command{
    // tools are whatever we decide pass down in the future
    name: string
    developers: Array<string>
    version: number
    run: (tools: CmdTools) => void
}
// :3 *hugs you* *hugs you back*