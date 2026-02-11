import { FC, useState } from "react";
import { malroth } from '../shared/resources/Images/index.ts';
import './BattleScreen.scss';
import Submenu from "./Submenu/Submenu.tsx";
import { PlayerData, BattleOptions, BattleOptionsType, EnemyStats } from "../shared/interfaces/interfaces.tsx";
import { defaultStats, playerData } from "./resources/resources.tsx";

const BattleScreen: FC = () => {
    const [optionSelected, setOptionSelected] = useState<BattleOptionsType | null>(null);
    const [activePlayer, setActivePlayer] = useState<PlayerData>(playerData[0]);

    const [enemyData, setEnemyData] = useState<EnemyStats[]>([
        {
            NAME: "Malroth",
            LVL: 70,
            HP: 5000,
            MP: 1000,
            STATS: defaultStats
        }
    ]);

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

    let activePartyMember = playerData[1];

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
                    {optionSelected ? 
                        <Submenu
                            playerData={activePlayer}
                            party={playerData}
                            setPlayerTurn={setActivePlayer}
                            enemyData={enemyData}
                            updateEnemyData={setEnemyData}
                            option={optionSelected} 
                            inventory={testInventory} 
                            backOption={() => setOptionSelected(null)} 
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
                </div>
                <div className="enemies">
                    MALROTH
                </div>
            </div>
        </div>
    )
};

export default BattleScreen;