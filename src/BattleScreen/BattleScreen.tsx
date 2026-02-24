import { FC, useState, useEffect } from "react";
import { malroth } from '../shared/resources/Images/index.ts';
import './BattleScreen.scss';
import Submenu from "./Submenu/Submenu.tsx";
import { PlayerData, BattleOptions, BattleOptionsType, EnemyStats, PlayerAction } from "../shared/interfaces/interfaces.tsx";
import { enemyStats, playerData } from "./resources/resources.tsx";
import { attackScript, processEnemyAttack } from "../scripts/battleScripts.tsx";

const BattleScreen: FC = () => {
    const [optionSelected, setOptionSelected] = useState<BattleOptionsType | null>(null);
    const [activePlayer, setActivePlayer] = useState<PlayerData>(playerData[0]);
    const [playerActions, setPlayerActions] = useState<PlayerAction[]>([]);
    const [battleText, setBattleText] = useState<PlayerAction[]>([]);
    const [currentText, setCurrentText] = useState<string>("");

    const [enemyData, setEnemyData] = useState<EnemyStats[]>([
        {
            NAME: "Malroth",
            LVL: 70,
            HP: 5000,
            MP: 1000,
            STATS: enemyStats.Malroth
        }
    ]);

    const [partyData, setPartyData] = useState<PlayerData[]>(playerData);

    const dataKeys: (keyof PlayerData)[] = ["NAME", "LVL", "HP", "MP"];

    function handleOptionClick(option: BattleOptionsType) {
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
            if (battleText.length === playerData.length) {
                for (let i = 0; i < battleText.length; i++) {
                    let text = `${battleText[i].player.NAME} `;

                    if (battleText[i].actionData.flee) {
                        text += 'attempts to flee from battle!';
                    } else if (battleText[i].actionData.normalAttack) {
                        attackScript(battleText[i].player, enemyData, setEnemyData, true);
                        text += `attacks ${battleText[i].actionData.target}!`;
                    } else if (battleText[i].actionData.defend) {
                        text += `braced themselves for the next attack!`;
                    }
                    setCurrentText(text);

                    await delay(2000);
                }

                for (let i = 0; i < enemyData.length; i++) {
                    const enemyText = processEnemyAttack(partyData, enemyData[i], setPartyData, true);
                    setCurrentText(enemyText ?? "");

                    await delay(2000);
                }

                setCurrentText("");
            }
        };

        processBattleText();
    }, [battleText])

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
                    <div className="current-player">
                        {activePlayer.NAME}
                    </div>
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
                                    setBattleText={setBattleText}
                                />
                                :
                                <>
                                    {BattleOptions.map(option => {
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