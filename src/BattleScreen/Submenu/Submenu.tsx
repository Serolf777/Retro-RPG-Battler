import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { MainMenuOptionsType, EnemyStats, PlayerAction, PlayerData, BattleOptionsType } from "../../shared/interfaces/interfaces";
import './Submenu.scss';

export interface SubmenuProps {
    playerData: PlayerData;
    party: PlayerData[];
    setPlayerTurn: (playerName: PlayerData) => void;
    playerActions: PlayerAction[];
    setPlayerActions: Dispatch<SetStateAction<PlayerAction[]>>;
    enemyData: EnemyStats[];
    updateEnemyData: (updatedEnemyData: EnemyStats[]) => void;
    option: MainMenuOptionsType;
    playerOption?: BattleOptionsType;
    inventory: string[];
    backOption: () => void;
    setBattleData: (actions: PlayerAction[]) => void;
}

const Submenu: FC<SubmenuProps> = ({ playerData, party, setPlayerTurn, playerActions, setPlayerActions, enemyData, updateEnemyData, option, playerOption, inventory, backOption, setBattleData }) => {
    const [magicSelected, setMagicSelected] = useState<boolean>(false);

    function processAction(action: BattleOptionsType) {
        let updatedActions: PlayerAction[] = [];

        for (let i = 0; i < party.length; i++) {
            updatedActions.push(
                {
                    player: party[i],
                    action: playerOption || 'DEFEND',
                    actionData: {
                        target: enemyData[0].NAME,
                        normalAttack: false,
                        defend: action === "DEFEND"
                    }
                }
            );
        }

        return updatedActions;
    }

    useEffect(() => {
        if (playerOption === 'DEFEND') {
            handleAllTurnsCompleted(processAction("DEFEND"));
            setTimeout(() => handleBack(), 2000);
        }
    }, [option]);

    function handleNextTurn(actions: PlayerAction[]) {
        const currentIndex = party.findIndex(player => player.NAME === playerData.NAME);
        const nextPartyMember = currentIndex + 1;

        if (nextPartyMember < party.length) {
            setPlayerTurn(party[nextPartyMember]);
        } else {
            handleAllTurnsCompleted(actions);
        }
    }

    function handleAttack() {
        const updatedActions = [...playerActions, 
            {
                player: playerData,
                action: playerOption || 'DEFEND',
                actionData: {
                    target: enemyData[0].NAME,
                    normalAttack: true
                }
            }
        ];

        setPlayerActions(updatedActions);
        handleNextTurn(updatedActions);
    }

    function handleMagic(spell: string) {
        console.log(spell);
    }

    function handleAllTurnsCompleted(actions: PlayerAction[]) {
        setBattleData(actions);
        setPlayerTurn(party[0]);
        setPlayerActions([]);
        setTimeout(() => handleBack(), 2000);
    }

    function handleBack() {
        if (magicSelected) {
            setMagicSelected(false);
        }setBattleData([]);
        backOption();
    }

    return (
        <div className="submenu-container">
            {option === 'FIGHT' && 
                <div className="attack-option-container" >
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
                </div>
            }

            {option === 'TACTICS' && 
                <div className="tactics-option-container" >
                    Filler Text for Tactics
                </div>
            }

            {playerOption === 'ITEM' && 
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

            {(option !== 'RUN' && playerOption !== 'DEFEND') && 
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