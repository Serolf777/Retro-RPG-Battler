import { FC, useState, useEffect } from "react";
import { malroth } from '../shared/resources/Images/index.ts';
import './BattleScreen.scss';
import Submenu from "./Submenu/Submenu.tsx";
import { PlayerData, MainMenuOptions, MainMenuOptionsType, EnemyStats, PlayerAction } from "../shared/interfaces/interfaces.tsx";
import { enemyStats, playerData } from "./resources/resources.tsx";
import { attackScript, processEnemyAttack, spellScript } from "../scripts/battleScripts.tsx";

const BattleScreen: FC = () => {
    const [optionSelected, setOptionSelected] = useState<MainMenuOptionsType | null>(null);
    const [activePlayer, setActivePlayer] = useState<PlayerData>(playerData[0]);
    const [playerActions, setPlayerActions] = useState<PlayerAction[]>([]);
    const [battleData, setBattleData] = useState<PlayerAction[]>([]);
    const [currentText, setCurrentText] = useState<string>("");
    const [partyData, setPartyData] = useState<PlayerData[]>(playerData);

    const [enemyData, setEnemyData] = useState<EnemyStats[]>([
        {
            NAME: "Malroth",
            LVL: 70,
            HP: 5000,
            MP: 1000,
            STATS: enemyStats.Malroth
        }
    ]);

    const dataKeys: (keyof PlayerData)[] = ["NAME", "LVL", "HP", "MP"];

    function handleOptionClick(option: MainMenuOptionsType) {
        setOptionSelected(option);
    };

    const testInventory = [
        "Medicinal Herb",
        "Prayer Ring",
        "Yggdrasil Leaf",
        "Medicinal Herb",
        "Medicinal Herb",
        "Yggdrasil Leaf"
    ];

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const processBattleText = async () => {
            if (optionSelected === "RUN") {
                setCurrentText(`The party attempts to flee from battle!`);
                await delay(2000);

                setCurrentText("");
                setOptionSelected(null);
            }

            if (battleData.length === playerData.length) {
                for (let i = 0; i < battleData.length; i++) {
                    let battleText = `${battleData[i].player.NAME} `;

                    if (battleData[i].actionData.flee) {
                        battleText += 'attempts to flee from battle!';
                    } else if (battleData[i].actionData.normalAttack) {
                        battleText += attackScript(battleData[i].player, enemyData, setEnemyData, battleData[i].actionData.normalAttack ?? false) ?? "";
                    } else if (battleData[i].actionData.spellUsed) {
                        battleText += spellScript(battleData[i].player, enemyData, setEnemyData, battleData[i].actionData.spellUsed ?? "") ?? "";
                    } else if (battleData[i].actionData.defend) {
                        battleText += `braced themselves for the next attack!`;
                    } else if (battleData[i].action === "PASS") {
                        battleText += `is unable to move!`;
                    }
                    setCurrentText(battleText);

                    await delay(2000);
                }

                for (let i = 0; i < enemyData.length; i++) {
                    const enemyText = processEnemyAttack(partyData, enemyData[i], setPartyData, true);
                    setCurrentText(enemyText ?? "");

                    await delay(2000);
                }

                if (partyData.every(player => player.HP <= 0)) {
                    setCurrentText("The party has been defeated...");
                } else if (enemyData.every(enemy => enemy.HP <= 0)) {
                    setCurrentText("The enemies have been defeated!");
                } else {
                  setCurrentText("");  
                }
            }
        };

        processBattleText();
    }, [battleData, optionSelected])

    useEffect(() => {
        if (partyData.every(player => player.HP <= 0)) {
            setCurrentText("The party has been defeated...");
        }
    }, [partyData]);

    return (
        <div className="battle-screen-container">
            <div className="battle-screen-top">
                <div className="player-data-container">
                    <table>
                        <thead className="player-data-header">
                            <tr>
                                {dataKeys.map(data => {
                                    return (
                                            <th key={data}>
                                                {data}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {playerData.map(player => {
                                return (
                                        <tr key={`player-${player.NAME}`}>
                                            <td className="player-stat">
                                                {player.NAME}
                                            </td>
                                            <td className="player-stat">
                                                {player.LVL}
                                            </td>
                                            <td className="player-stat">
                                                {player.HP}
                                            </td>
                                            <td className="player-stat">
                                                {player.MP}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="enemies-pictures">
                   <img
                        height="250px"
                        src={malroth}
                   />
                </div>
            </div>
            <div className="battle-screen-bottom">
                <div className="battle-options">
                    {optionSelected === 'FIGHT' &&
                        <div className="current-player">
                            {activePlayer.NAME}
                        </div>
                    }
                    {currentText ?
                        <div className="battle-text">
                            {currentText}
                        </div>
                        :
                        <>
                            {optionSelected ? 
                                <Submenu
                                    playerData={activePlayer}
                                    party={playerData}
                                    setPlayerTurn={setActivePlayer}
                                    playerActions={playerActions}
                                    setPlayerActions={setPlayerActions}
                                    enemyData={enemyData}
                                    updateEnemyData={setEnemyData}
                                    option={optionSelected}
                                    inventory={testInventory} 
                                    backOption={() => setOptionSelected(null)}
                                    setBattleData={setBattleData}
                                />
                                :
                                <>
                                    {MainMenuOptions.map(option => {
                                            return (
                                                <div className="option" key={option} onClick={() => handleOptionClick(option)}>
                                                    {option}
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            }
                        </>
                    }
                </div>
                <div className="enemies">
                    MALROTH
                </div>
            </div>
        </div>
    )
};

export default BattleScreen;