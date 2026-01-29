import { FC, useState } from 'react';
import './MainPage.scss';
import { Crtv } from '../shared/resources/Images/index.ts';
import battleTheme from "../shared/resources/Songs/battleTheme.mp3";
import gruelingBattle from "../shared/resources/Songs/gruelingBattle.mp3";
import BattleScreen from '../BattleScreen/BattleScreen.tsx';

const MainPage: FC = () => {
    const [songOption, setSongOption] = useState(0);
    const [audio, setAudio] = useState(new Audio(battleTheme));

    function toggleMusic() {
        audio.paused ? audio.play() : audio.pause();
    }

    function toggleTheme() {
        if (songOption === 0) {
            audio.pause();
            setAudio(new Audio(gruelingBattle));
            setSongOption(1);
        } else {
            audio.pause();
            setAudio(new Audio(battleTheme));
            setSongOption(0);
        }
    }

    return (
        <div className="main-page-container">
            <div className="main-page-content">
                <div className="tv-container">
                    <div className="tv-img-container">
                        <img
                            src={Crtv}
                            height="800px"
                            className="tv-picture"
                        />
                        <button onClick={toggleMusic} className="play-music" />
                    </div>
                    <div className="tv-content">
                        <BattleScreen />
                    </div>
                </div>
            </div>
            <button onClick={toggleTheme} className="toggle-theme">
                Toggle Theme
            </button>
        </div>
    )
}

export default MainPage;