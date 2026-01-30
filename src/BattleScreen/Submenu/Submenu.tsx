import { FC, useState, useEffect } from "react";
import { BattleOptionsType, EnemyStats } from "../../shared/interfaces/interfaces";
import './Submenu.scss';

export interface SubmenuProps {
    enemyData: EnemyStats[];
    option: BattleOptionsType;
    inventory: string[];
    backOption: () => void;
}

const Submenu: FC<SubmenuProps> = ({ option, inventory, backOption }) => {
    const [battleText, setBattleText] = useState<string>("");

    useEffect(() => {
        if (option === 'RUN') {
            setBattleText('You fled successfully!');
            setTimeout(() => backOption(), 2000);
        } else if (option === 'DEFEND') {
            setBattleText('You brace yourself for the next attack.');
            setTimeout(() => backOption(), 2000);
        }
    }, [option]);

    return (
        <div className="submenu-container">
            {option === 'FIGHT' && 
                <div className="attack-option-container" >
                    <div className="attack-option" onClick={() => console.log('ATTACK')}>
                        ATTACK
                    </div>
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

            {(option !== 'RUN' && option !== 'DEFEND') && 
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