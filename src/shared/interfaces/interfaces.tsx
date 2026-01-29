export interface PlayerData {
    NAME: string;
    LVL: number;
    HP: number;
    MP: number;
};

export type BattleOptionsType = "FIGHT" | "RUN" | "DEFEND" | "ITEM";

export const BattleOptions: BattleOptionsType[] = [
    "FIGHT", "RUN", "DEFEND", "ITEM"
]