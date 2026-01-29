import { FC } from "react";
import { BattleOptionsType } from "../../shared/interfaces/interfaces";
import './Submenu.scss';

export interface SubmenuProps {
    option: BattleOptionsType;
    inventory: string[];
    backOption: () => void;
}

const Submenu: FC<SubmenuProps> = ({ option, inventory, backOption }) => {

    return (
        <div className="submenu-container">
            {option === 'ITEM' && 
             <div>
                {inventory.map((item, index) => {
                    return (
                        <div key={`${item}-${index}`}>
                            {item}
                        </div>
                    )
                })}
             </div>
            }
            <div className="back-option" onClick={backOption}>
                BACK
            </div>
        </div>
    )
};

export default Submenu;