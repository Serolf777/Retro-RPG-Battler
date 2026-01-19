import { FC } from 'react';
import './MainPage.scss';
import { Crtv } from '../shared/resources/Images/index.ts';
import battleTheme from "../shared/resources/Songs/battleTheme.mp3";

const MainPage: FC = () => {
    const audio = new Audio(battleTheme);
    function toggleMusic() {
        audio.paused ? audio.play() : audio.pause();
    }

    return (
        <div className="main-page-container">
            <div className="main-page-header">
                Retro RPG Battler
            </div>
            <div className="main-page-content">
                <img
                    src={Crtv}
                    height="800px"
                />
            </div>

            <button onClick={toggleMusic} className="play-music">
                Play
            </button>
        </div>
    )
}

export default MainPage;