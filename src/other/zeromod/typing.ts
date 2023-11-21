export interface profile {

    hp: number
    strikes: strike[]
    ids: number[] // no ban evasion :3
    quarantined: boolean
}

export interface strike {

    case: number
    explanation: string
    proof: string
    damage: number
    timestamp: number // epoch time thingy
}