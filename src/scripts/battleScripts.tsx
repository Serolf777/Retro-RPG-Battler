import { EnemyStats, PlayerData } from "../shared/interfaces/interfaces.tsx"


export function attackScript(playerData: PlayerData, enemyData: EnemyStats[], updatedEnemyData: (updatedEnemyData: EnemyStats[]) => void, normalAtk: boolean) {
    let dmg = playerData.STATS.Atk - enemyData[0].STATS.Def;

    if (dmg < 1) {
        dmg = 1;
    }
    
    enemyData[0].HP -= dmg;
    updatedEnemyData([...enemyData]);

    if (normalAtk) {
        return `${playerData.NAME} attacked ${enemyData[0].NAME} for ${dmg} damage!`;
    }
}

export function determineRandomTarget(numberOfTargets: number) {
    return Math.floor(Math.random() * numberOfTargets);
}

export function processEnemyAttack(playerData: PlayerData[], enemyData: EnemyStats, updatedPlayerData: (updatedPlayerData: PlayerData[]) => void, normalAtk: boolean) {
    const randomTarget = determineRandomTarget(playerData.length);

    let dmg = enemyData.STATS.Atk - playerData[randomTarget].STATS.Def;

    if (dmg < 1) {
        dmg = 1;
    }

    playerData[randomTarget].HP -= dmg;
    updatedPlayerData([...playerData]);

    if (normalAtk) {
        return `${enemyData.NAME} attacked ${playerData[randomTarget].NAME} for ${dmg} damage!`;
    }
}