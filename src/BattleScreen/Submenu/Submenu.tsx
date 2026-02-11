import { FC, useState, useEffect } from "react";
import { BattleOptionsType, EnemyStats, PlayerData } from "../../shared/interfaces/interfaces";
import { attackScript } from "../../scripts/battleScripts.tsx";
import './Submenu.scss';

export interface SubmenuProps {
    playerData: PlayerData;
    party: PlayerData[];
    setPlayerTurn: (playerName: PlayerData) => void;
    enemyData: EnemyStats[];
    updateEnemyData: (updatedEnemyData: EnemyStats[]) => void;
    option: BattleOptionsType;
    inventory: string[];
    backOption: () => void;
}

const Submenu: FC<SubmenuProps> = ({ playerData, party, setPlayerTurn, enemyData, updateEnemyData, option, inventory, backOption }) => {
    const [battleText, setBattleText] = useState<string>("");
    const [magicSelected, setMagicSelected] = useState<boolean>(false);

    useEffect(() => {
        if (option === 'RUN') {
            setBattleText('Party fled successfully!');
            setTimeout(() => handleBack(), 2000);
        } else if (option === 'DEFEND') {
            setBattleText(`${playerData.NAME} braced themselves for the next attack.`);
            setTimeout(() => handleBack(), 2000);
        }
    }, [option]);

    function handleNextTurn() {
        const currentIndex = party.findIndex(player => player.NAME === playerData.NAME);
        const nextPartyMember = currentIndex + 1;

        backOption();

        if (nextPartyMember < party.length) {
            setPlayerTurn(party[nextPartyMember]);
        } else {
            setPlayerTurn(party[0]);
        }
    }

    function handleAttack() {
        attackScript(playerData, enemyData, updateEnemyData, setBattleText);
        setTimeout(() => handleNextTurn(), 2000);
    }

    function handleMagic(spell: string) {
        console.log(spell);
    }

    function handleBack() {
        if (magicSelected) {
            setMagicSelected(false);
        }
        backOption();
    }

    return (
        <div className="submenu-container">
            {option === 'FIGHT' && 
                <div className="attack-option-container" >
                    {battleText === "" ?
                        <div className="attack-options">
                            {!magicSelected ? 
                            <>
                                <div className="attack-option" onClick={handleAttack}>
                                    ATTACK
                                </div>
                                {playerData.SPELLS.length > 0 &&
                                    <div className="magic-option" onClick={() => setMagicSelected(true)}>
                                        MAGIC
                                    </div>
                                }
                            </>
                            :
                            <>
                                {playerData.SPELLS.map((spell, index) => {
                                    return (
                                        <div key={`${spell}-${index}`} className="magic-option" onClick={() => console.log(spell)}>
                                            {spell}
                                        </div>
                                    )
                                })}
                            </>
                            }
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
                <div className="item-options">
                    {inventory.map((item, index) => {
                        return (
                            <div key={`${item}-${index}`} className="item-option" onClick={() => console.log(item)}>
                                {item}
                            </div>
                        )
                    })}
                </div>
             </div>
            }

            {(option !== 'RUN' && option !== 'DEFEND' && battleText === "") && 
                <div className="back-option-container" >
                    <div className="back-option" onClick={handleBack}>
                        BACK
                    </div>
                </div>
            }
        </div>
    )
};

export default Submenu;