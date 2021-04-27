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
const fails = ['Sorry', 'So close', ':(', 'Ouch', 'Whoops', 'Oopsie', 'Dang', 'Answer', 'Bummer', 'Crap']
const levels = ['Major', 'Minor', 'Both']


var currentLevel = 0
var gameComplete = false
var solved = []

const play = (lastResult) => {
  const type = currentLevel < 2 ? types[currentLevel] : pickRandom(types)
  const letters = type === "maj" ? major_letters : minor_letters
  const letter = pickRandom(letters.filter(l => solved.indexOf(l) === -1))
  const clef = pickRandom(clefs)

  return { clef, type, letter, letters, lastResult }
};

function KeySignature ({letter: key}) {
  return (
    <Fragment>{key.split('')[0]}<span style={{
      fontSize: '0.75em', pointerEvents: 'none'
    }}>{key.split('')[1] || ''}</span></Fragment>
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
    var win = e.target.textContent === letter
    const count = lastResult.count + 1
    const streak = win ? (lastResult.streak || 0) + 1 : 0
    const losses = !win ? (lastResult.losses || 0) + 1 : 0
    win && solved.push(letter)

    if (solved.length === letters.length) {
      solved = []
      currentLevel = Math.min(currentLevel + 1, levels.length - 1)
      gameComplete = gameComplete || currentLevel === levels.length - 1
      setState(play({ count: 0 }))
    } else {
      setState(play({ count, streak, losses, win, lastLetter: letter }))
    }
  };

  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.gstatic.com" /> 
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;900&display=swap" rel="stylesheet"/>
      <style>{'* { font-family: Roboto }'}</style>
      <header className="App-header">
        <div className='Result' style={{
            background: lastResult.win ? 'green' : (lastResult.win === undefined ? (gameComplete ? 'green' : 'inherit') : 'red'),
          }}>
          <div>{lastResult.win ? (
            lastResult.streak > 1 ? `${lastResult.streak} POINT STREAK!`: 'NICE!'
          ) : (gameComplete ? (
            <a href={prizeLink} style={{ display: "none" }}>
              Click here
            </a>
          ) : `${pickRandom(fails)}...${lastResult.lastLetter}`)}</div>
        </div>
        <h4 style={{fontWeight: 300}}>Level {currentLevel + 1}: {levels[currentLevel]}</h4>
        <div className={`App-logo ${className}`} />
        <div className="Answers">
          {letters.map((key) => (
            <button key={key} onClick={onClick}>
              <KeySignature letter={key} />
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
