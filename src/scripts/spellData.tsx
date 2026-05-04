export function SpellDmg(spellName: string, mag: number) {
    switch(spellName) {
        case "Frizzle":
            return 180 + mag;
        case "Kafrizzle":
            return 130 + mag;
        case "Kafrizz":
            return 130 + mag;
        default: 
            return 0;
    }
}