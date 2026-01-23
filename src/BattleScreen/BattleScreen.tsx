import { FC } from "react";
import { malroth } from '../shared/resources/Images/index.ts';
import './BattleScreen.scss';

interface PlayerData {
    NAME: string;
    LVL: number;
    HP: number;
    MP: number;
};

const BattleScreen: FC = () => {
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

    const battleOptions = ["FIGHT", "RUN", "DEFEND", "FLEE"];


    return (
        <div className="battle-screen-container">
            <div className="battle-screen-top">
                <div className="player-data-container">
                    <div className="player-data-header">
                        {dataKeys.map(data => {
                                return (
                                    <div className="header">
                                        {data}
                                    </div>
                                )
                            })
                        }
                    </div>

                    {playerData.map(player => {
                            return (
                                <div className="player-stat">
                                    {player.NAME} {player.LVL} {player.HP} {player.MP}
                                </div>
                            )
                        })
                    }
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
                    {battleOptions.map(option => {
                            return (<div className="option">{option}</div>)
                        })
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