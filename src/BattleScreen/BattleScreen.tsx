import { FC, useState } from "react";
import { malroth } from '../shared/resources/Images/index.ts';
import './BattleScreen.scss';
import Submenu from "./Submenu/Submenu.tsx";
import { PlayerData, BattleOptions, BattleOptionsType } from "../shared/interfaces/interfaces.tsx";

const BattleScreen: FC = () => {
    const [optionSelected, setOptionSelected] = useState<BattleOptionsType | null>(null);
    const dataKeys: (keyof PlayerData)[] = ["NAME", "LVL", "HP", "MP"];

    const playerData: PlayerData[] = [
        {
            NAME: "Hero",
            LVL: 31,
            HP: 119,
            MP: 0
        },
        {
            NAME: "Lloyd",
            LVL: 29,
            HP: 149,
            MP: 43
        },
        {
            NAME: "Margo",
            LVL: 23,
            HP: 108,
            MP: 43
        }
    ];

    function handleOptionClick(option: BattleOptionsType) {
        setOptionSelected(option);
    };

    const testInventory = [
        "Medicinal Herb",
        "Prayer Ring",
        "Yggdrasil Leaf"
    ];

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
                        HERO
                    </div>
                    {optionSelected ? 
                        <Submenu option={optionSelected} inventory={testInventory} backOption={() => setOptionSelected(null)} />
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