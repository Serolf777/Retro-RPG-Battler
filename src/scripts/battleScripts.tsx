import { EnemyStats, PlayerData } from "../shared/interfaces/interfaces.tsx"


export function attackScript(playerData: PlayerData, enemyData: EnemyStats[], updatedEnemyData: (updatedEnemyData: EnemyStats[]) => void, normalAtk: boolean) {
    let dmg = playerData.STATS.Atk - enemyData[0].STATS.Def;

    if (dmg < 1) {
        dmg = 1;
    }
    
    enemyData[0].HP -= dmg;
    updatedEnemyData([...enemyData]);

    if (normalAtk) {
        return `attacked ${enemyData[0].NAME} for ${dmg} damage!`;
    }
}

export function determineRandomTarget(numberOfTargets: number) {
    return Math.floor(Math.random() * numberOfTargets);
};

export function determineValidPlayerTargets(players: PlayerData[]) {
    return players.filter((player) => player.HP > 0);
}

export function processEnemyAttack(playerData: PlayerData[], enemyData: EnemyStats, updatedPlayerData: (updatedPlayerData: PlayerData[]) => void, normalAtk: boolean) {
    const validTargets = determineValidPlayerTargets(playerData);

    const randomTarget = determineRandomTarget(validTargets.length);
    const targetedIndex = playerData.findIndex((player) => player.NAME === validTargets[randomTarget].NAME);

    let dmg = enemyData.STATS.Atk - playerData[targetedIndex].STATS.Def;

    if (dmg < 1) {
        dmg = 1;
    }

    playerData[targetedIndex].HP -= dmg;

    if (playerData[targetedIndex].HP < 0) {
        playerData[targetedIndex].HP = 0;
    }

    updatedPlayerData([...playerData]);

    if (normalAtk) {
        return `${enemyData.NAME} attacked ${playerData[randomTarget].NAME} for ${dmg} damage!`;
    }
}