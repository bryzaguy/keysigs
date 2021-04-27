import "./App.css";
import { useState } from "react";

const pickRandom = (arr) => arr[Math.ceil(Math.random() * arr.length) - 1];

const prizeLink =
  "https://docs.google.com/document/d/1e8bCDXDnz1Y-qnNY2vTknYMVThinHRO2Ur9eF1V1DZk/edit?usp=sharing";

const major_letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "C#",
  "F#",
  "Ab",
  "Bb",
  "Cb",
  "Db",
  "Eb",
  "Gb",
].sort();

const minor_letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "A#",
  "C#",
  "D#",
  "G#",
  "Ab",
  "Bb",
  "Cb",
  "Db",
  "Eb",
  "Gb",
].sort();

const types = ["maj", "min"];
const clefs = ["treble", "bass"];

const newGame = (lastResult) => {
  const type = pickRandom(types);
  const letters = type === "maj" ? major_letters : minor_letters;
  const letter = pickRandom(letters);
  const clef = pickRandom(clefs);

  return { clef, type, letter, letters, lastResult };
};

function App() {
  const [{ clef, type, letter, letters, lastResult }, setState] = useState(
    newGame()
  );

  const cssLetter = letter.replace("#", "s").replace("b", "f").toLowerCase();
  const className = `${clef}-${cssLetter}-${type}`;

  const onClick = (e) => {
    const game = newGame(e.target.textContent === letter)
    setState(game)
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='Result' style={{color: lastResult ? 'green' : 'red'}}>{lastResult ? 'GOT IT!' : 'BUMMER'}</div>
        <div className={`App-logo ${className}`} />
        <div className="Answers">
          {letters.map((key) => (
            <button key={key} onClick={onClick}>{key}</button>
          ))}
        </div>
      </header>
      <a href={prizeLink} style={{ display: "hidden" }}>
        {prizeLink}
      </a>
    </div>
  );
}

export default App;
