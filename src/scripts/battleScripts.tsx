import { EnemyStats, PlayerData } from "../shared/interfaces/interfaces.tsx"


export function attackScript(playerData: PlayerData, enemyData: EnemyStats[], updatedEnemyData: (updatedEnemyData: EnemyStats[]) => void, battleText?: (text: string) => void) {
    let dmg = playerData.STATS.Atk - enemyData[0].STATS.Def;

    if (dmg < 1) {
        dmg = 1;
    }
    
    enemyData[0].HP -= dmg;
    updatedEnemyData([...enemyData]);

    if (battleText) {
        battleText(`${playerData.NAME} attacked ${enemyData[0].NAME} for ${dmg} damage!`);
    }
}