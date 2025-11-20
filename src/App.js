import "./App.scss";
import appStyle from "./config/AppStyle.js";
import Navbar from "./components/parts/Navbar";
import Footer from "./components/parts/Footer";
import Bowl from "./components/elements/Bowl";
import Table from "./components/elements/Table";
import Poster from "./components/elements/Poster";
import Monitor from "./components/elements/Monitor";
import Clock from "./components/elements/Clock";
import Button from "./components/elements/Button";
import Turtle from "./components/elements/Turtle";
import RandomWords from 'random-words'
import { useEffect, useMemo, useRef, useState } from "react";

const envLen = parseInt(process.env.REACT_APP_SENTENCE_LENGTH);
const DEFAULT_LENGTH = Number.isFinite(envLen) ? Math.min(envLen, 15) : 15;
const MAX_TRAVEL_VW = 60; // approximate travel distance toward the bowl

function App() {
    const [words, setWords] = useState(() => RandomWords(DEFAULT_LENGTH));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [typed, setTyped] = useState("");

    const startedRef = useRef(false);
    const startTimeRef = useRef(0);

    const totalWords = words.length;
    const wordsLeft = useMemo(() => words.slice(currentIndex), [words, currentIndex]);
    const expectedWord = words[currentIndex] || "";
    const progress = totalWords > 0 ? currentIndex / totalWords : 0;
    const isFinished = currentIndex >= totalWords && totalWords > 0;

    const turtleStyle = useMemo(() => {
      return {
        ...appStyle.styleTurtle,
        transform: `translateX(${(progress * MAX_TRAVEL_VW).toFixed(2)}vw)`
      }
    }, [progress]);

    const handleTypingStart = () => {
      if (!startedRef.current) {
        startedRef.current = true;
        startTimeRef.current = Date.now();
      }
    };

    const handleWordComplete = (correct) => {
      if (!correct) return;
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (startedRef.current) {
        const elapsedMs = Date.now() - startTimeRef.current;
        const minutes = elapsedMs / 60000;
        const computed = minutes > 0 ? nextIndex / minutes : 0;
        setWpm(Math.round(computed));
      }
      setTyped("");
    };

    const resetRace = () => {
      setWords(RandomWords(DEFAULT_LENGTH));
      setCurrentIndex(0);
      setWpm(0);
      setTyped("");
      startedRef.current = false;
      startTimeRef.current = 0;
    };

    return (
      <div className="App openSans">
        <Navbar />
        <div className="body">
          <Poster
            style={appStyle.stylePoster}
            width={25}
            height={35}
            content={wordsLeft}
            typed={typed}
          />
          <Button
            style={appStyle.styleButton}
            width={9}
            height={3}
            content="New Race"
            onClick={resetRace}
          />
          <Clock
            style={appStyle.styleClock}
            width={12}
            height={12}
            time="Start"
          />
          <Table style={appStyle.styleTable} width={77} height={20}/>
          <Monitor
            style={appStyle.styleMonitor}
            width={30}
            height={37}
            expectedWord={isFinished ? "" : expectedWord}
            onWordComplete={handleWordComplete}
            onTypingStart={handleTypingStart}
            onTypingChange={setTyped}
            disabled={isFinished}
          />
          <Bowl style={appStyle.styleBowl} width={8} height={8} wpm={wpm} />
          <Turtle style={turtleStyle} width={8} height={10} />
          {isFinished && (
            <div style={{
              position: "absolute",
              top: "40vh",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.7)",
              color: "#fff",
              padding: "1rem 1.5rem",
              borderRadius: "8px",
              zIndex: 10
            }}>
              <div className="fredokaOne" style={{fontSize: "1.4rem", textAlign: "center"}}>
                Congrats! {wpm} wpm
              </div>
            </div>
          )}
        </div>
        <div className="smallScreen">
          <div className="buy fredokaOne">BUY BIGGER SCREEN</div>
          <Turtle style={appStyle.styleSmall} width={80} height={35} />
        </div>
        <Footer />
      </div>
    );
}

export default App;
