import { PlayerData } from "../../shared/interfaces/interfaces";

export const defaultStats = {
    Atk: 50,
    Def: 50,
    Mag: 50,
    Spd: 50,
    Evasion: 5
}

export const playerData: PlayerData[] = [
    {
        NAME: "Hero",
        LVL: 31,
        HP: 119,
        MP: 0,
        STATS: defaultStats,
        SPELLS: []
    },
    {
        NAME: "Lloyd",
        LVL: 29,
        HP: 149,
        MP: 43,
        STATS: defaultStats,
        SPELLS: ["Frizzle", "Kafrizzle", "Kafrizz", "Kacrack", "Healmore", "Kaboom"]
    },
    {
        NAME: "Margo",
        LVL: 23,
        HP: 108,
        MP: 43,
        STATS: defaultStats,
        SPELLS: ["Heal", "Multiheal", "Fullheal", "Kazing"]
    }
];