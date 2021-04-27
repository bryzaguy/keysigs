import "./App.css";
import { useState } from "react";

const pickRandom = (arr) => arr[Math.ceil(Math.random() * arr.length) - 1];

// Streak score
// Time multiplier

const prizeLink =
  "https://docs.google.com/document/d/1e8bCDXDnz1Y-qnNY2vTknYMVThinHRO2Ur9eF1V1DZk/edit?usp=sharing";

const major_letters = [
  "A", "B", "C", "D", "E", "F", "G", "C#", "F#", "Ab", "Bb", "Cb", "Db", "Eb", "Gb",
].sort();

const minor_letters = [
  "A", "B", "C", "D", "E", "F", "G", "A#", "C#", "D#", "G#", "Ab", "Bb", "Cb", "Db", "Eb", "Gb",
].map(l => l.toLowerCase()).sort();

const types = ["maj", "min"];
const clefs = ["treble", "bass"];

const newGame = (lastResult) => {
  const type = pickRandom(types)
  const letters = type === "maj" ? major_letters : minor_letters
  const letter = pickRandom(letters)
  const clef = pickRandom(clefs)

  return { clef, type, letter, letters, lastResult }
};

function App() {
  const [{ clef, type, letter, letters, lastResult }, setState] = useState(
    newGame({})
  )

  const cssLetter = letter.split('').map(
    (l, i) => i < 1 ? l : l.replace("#", "s").replace("b", "f")
  ).join('')
  const className = `${clef}-${cssLetter.toLowerCase()}-${type}`

  const onClick = (e) => {
    const game = newGame({
      count: lastResult.count++,
      win: e.target.textContent === letter
    })
    setState(game)
  };

  return (
    <div className="App">
      <header className="App-header">
        {lastResult.win !== undefined && (
          <div className='Result' style={{color: lastResult.win ? 'green' : 'red'}}>
            {lastResult.win ? 'GOT IT!' : 'BUMMER :('}
          </div>
        )}
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
