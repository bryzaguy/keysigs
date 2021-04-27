import "./App.css";
import { Fragment, useState } from "react";

const pickRandom = (arr) => arr[Math.ceil(Math.random() * arr.length) - 1];

// Streak score
// Time multiplier

const prizeLink =
  "https://docs.google.com/document/d/1e8bCDXDnz1Y-qnNY2vTknYMVThinHRO2Ur9eF1V1DZk/edit?usp=sharing";

const major_letters = [
  "A", "B", "C", "D", "E", "F", "G", "C#", "F#", "Ab", "Bb", "Cb", "Db", "Eb", "Gb",
].sort();

const minor_letters = [
  "A", "B", "C", "D", "E", "F", "G", "A#", "C#", "D#", "F#", "G#", "Ab", "Bb", "Eb",
].map(l => l.toLowerCase()).sort();

const types = ["maj", "min"];
const clefs = ["treble", "bass"];
const fails = ['Sorry', 'So close', ':(', 'Ouch', 'Whoops', 'Dang!', 'Answer']
const levels = ['Major', 'Minor', 'Mixed']
const currentLevel = 0

const play = (lastResult) => {
  const type = currentLevel < 2 ? types[currentLevel] : pickRandom(types)
  const letters = type === "maj" ? major_letters : minor_letters
  const letter = pickRandom(letters)
  const clef = pickRandom(clefs)

  return { clef, type, letter, letters, lastResult }
};

function KeySignature ({letter: key}) {
  return (
    <Fragment>{key.split('')[0]}<span style={{fontSize: '0.75em'}}>{key.split('')[1] || ''}</span></Fragment>
  )
}

function App() {
  const [{ clef, type, letter, letters, lastResult }, setState] = useState(
    play({count: 0})
  )

  const cssLetter = letter.split('').map(
    (l, i) => i < 1 ? l : l.replace("#", "s").replace("b", "f")
  ).join('')
  const className = `${clef}-${cssLetter.toLowerCase()}-${type}`

  const onClick = (e) => {
    const win = e.target.textContent === letter
    const count = lastResult.count + 1
    const streak = win ? (lastResult.streak || 0) + 1 : 0

    setState(play({ count, streak, win, lastLetter: letter }))
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='Result' style={{
            background: lastResult.win ? 'green' : 'red',
            visibility: lastResult.win !== undefined ? 'inherit' : 'hidden'
          }}>
          <div>{lastResult.win ? (
            lastResult.streak > 1 ? `${lastResult.streak} POINT STREAK!`: 'NICE!'
          ) : `${pickRandom(fails)}...${lastResult.lastLetter}`}</div>
        </div>
        <div className={`App-logo ${className}`} />
        <div className="Answers">
          {letters.map((key) => (
            <button key={key} onClick={onClick}>
              <KeySignature letter={key} />
            </button>
          ))}
        </div>
      </header>
      <a href={prizeLink} style={{ display: "none" }}>
        {prizeLink}
      </a>
    </div>
  );
}

export default App;
