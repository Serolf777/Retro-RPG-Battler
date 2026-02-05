export interface Stats {
    Atk: number;
    Def: number;
    Mag: number;
    Spd: number;
    Evasion: number;
}

export interface PlayerData {
    NAME: string;
    LVL: number;
    HP: number;
    MP: number;
    STATS: Stats;
    SPELLS: string[];
};

export type BattleOptionsType = "FIGHT" | "RUN" | "DEFEND" | "ITEM";

export interface EnemyStats {
    NAME: string;
    LVL: number;
    HP: number;
    MP: number;
    STATS: Stats;
}

export const BattleOptions: BattleOptionsType[] = [
    "FIGHT", "RUN", "DEFEND", "ITEM"
]