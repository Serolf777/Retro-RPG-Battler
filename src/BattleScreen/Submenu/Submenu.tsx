import { FC, useState, useEffect } from "react";
import { BattleOptionsType, EnemyStats, PlayerData } from "../../shared/interfaces/interfaces";
import { attackScript } from "../../scripts/battleScripts.tsx";
import './Submenu.scss';

export interface SubmenuProps {
    playerData: PlayerData;
    enemyData: EnemyStats[];
    updateEnemyData: (updatedEnemyData: EnemyStats[]) => void;
    option: BattleOptionsType;
    inventory: string[];
    backOption: () => void;
}

const Submenu: FC<SubmenuProps> = ({ playerData, enemyData, updateEnemyData, option, inventory, backOption }) => {
    const [battleText, setBattleText] = useState<string>("");

    useEffect(() => {
        if (option === 'RUN') {
            setBattleText('Party fled successfully!');
            setTimeout(() => backOption(), 2000);
        } else if (option === 'DEFEND') {
            setBattleText(`${playerData.NAME} braced themselves for the next attack.`);
            setTimeout(() => backOption(), 2000);
        }
    }, [option]);

    function handleAttack() {
        attackScript(playerData,enemyData, updateEnemyData, setBattleText);
        setTimeout(() => backOption(), 2000);
    }

    return (
        <div className="submenu-container">
            {option === 'FIGHT' && 
                <div className="attack-option-container" >
                    {battleText === "" ?
                        <div className="attack-option" onClick={handleAttack}>
                            ATTACK
                        </div>
                    :
                        <div className="attack-option-text">
                            {battleText}
                        </div>
                    }
                </div>
            }

            { option === 'RUN' &&
                <div className="run-option-container">
                    <div className="run-option-text">
                        {battleText}
                    </div>
                </div>
            }

            { option === 'DEFEND' &&
                <div className="defend-option-container">
                    <div className="defend-option-text">
                        {battleText}
                    </div>
                </div>
            }

            {option === 'ITEM' && 
             <div className="item-option-container">
                {inventory.map((item, index) => {
                    return (
                        <div key={`${item}-${index}`} className="item-option" onClick={() => console.log(item)}>
                            {item}
                        </div>
                    )
                })}
             </div>
            }

            {(option !== 'RUN' && option !== 'DEFEND' && battleText === "") && 
                <div className="back-option-container" >
                    <div className="back-option" onClick={backOption}>
                        BACK
                    </div>
                </div>
            }
        </div>
    )
};

export default Submenu;