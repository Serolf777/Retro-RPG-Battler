import { Routes, Route, HashRouter } from "react-router-dom";
import './App.scss';
import MainPage from './MainPage/MainPage.tsx'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
