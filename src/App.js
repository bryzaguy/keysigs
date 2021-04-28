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
  "A", "B", "C", "D", "E", "F", "G", "A#", "C#", "D#", "F#", "G#", "Ab", "Bb", "Eb"
].map(l => l.toLowerCase()).sort();

const clefs = ["treble", "bass"];
const fails = ['Sorry', 'So close', ':(', 'Ouch', 'Whoops', 'Oopsie', 'Dang', 'Answer', 'Bummer', 'Crap']
const wins = ['Nice!', 'Cool!', 'Huzzah!', 'Pow!', 'Booyah!', 'Zing!', 'Cha-ching!', 'Dope!', 'Sick!']
const levels = ['Major', 'Minor', 'Both']
const levelLabel = {
  maj: 'Major',
  min: 'Minor'
}

var currentLevel = 0
var gameComplete = false
var solved = []

const play = (previous) => {
  const letters = [major_letters, minor_letters][currentLevel] || major_letters.concat(minor_letters)
  const letter = pickRandom(letters.filter(l => solved.indexOf(l) === -1))
  const type = major_letters.indexOf(letter) > -1 ? 'maj' : 'min'
  const clef = pickRandom(clefs)

  return { clef, type, letter, letters, previous }
};

function App() {
  const [{ clef, type, letter, letters, previous }, setState] = useState(
    play({count: 0})
  )
  const remainingCount = letters.length - solved.length
  const headerColor = previous.win || gameComplete ? 'green' : (
    previous.win === false ? 'red' : 'lightgrey'
  )

  const bannerContent = previous.win ? (
    previous.streak > 1 ? `${previous.streak} POINT STREAK!`: pickRandom(wins)
  ) : (gameComplete ? (
      <Prize />
    ) : (previous.lastLetter ? 
      <KeySignature letter={previous.lastLetter}>
        {pickRandom(fails)}...
      </KeySignature> : 'READY?'))

  const onClick = (e) => {
    var win = e.target.textContent === letter
    const count = previous.count + 1
    const streak = win ? (previous.streak || 0) + 1 : 0
    const losses = !win ? (previous.losses || 0) + 1 : 0
    win && solved.push(letter)

    if (solved.length === letters.length) {
      solved = []
      gameComplete = gameComplete || (currentLevel === levels.length - 1)
      currentLevel = Math.min(currentLevel + 1, levels.length - 1)
      setState(play({ count: 0 }))
    } else {
      setState(play({ count, streak, losses, win, lastLetter: letter }))
    }
  };

  return (
    <div className="App">
      <RobotoFont />
      <header className="App-header">
        <Banner color={headerColor} previous={previous}>{bannerContent}</Banner>
        <LevelStars level={currentLevel} />
        <LevelHeader type={levelLabel[type]} remainingCount={remainingCount} />
        <KeySignatureImage letter={letter} clef={clef} type={type} />
        <KeySignatureButtons letters={type === 'maj' ? major_letters : minor_letters} onClick={onClick} />
      </header>
    </div>
  );
}

function LevelStars ({level}) {
  return (
    <div className="LevelStars">
      {levels.map((_, levelIndex) => {
        const isCurrentLevel = level === levelIndex
        const isComplete = level > levelIndex
        const color = isCurrentLevel ? 'darkgrey' : (
          isComplete ? 'green' : 'lightgrey'
        )
        const animation = isCurrentLevel && !gameComplete ? 'pulse' : (
          isComplete ? 'wow' : ''
        )

        return (
          <span className="LevelStar">
            Level {levelIndex + 1}: &nbsp;
            <Star color={color} animation={animation} repeatAnimation={isCurrentLevel} />
          </span>
        )
      })}
    </div>
  )
}

function Star ({color, animation, repeatAnimation}) {
  return (
    <svg className={`Star ${animation}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path style={{
        fill: color
      }} d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
    </svg>
  )
}

function KeySignature ({letter: key, children}) {
  const [first, second] = key.split('')
  return (
    <Fragment>{children}{first}<span className="KeyAugment">{second || ''}</span></Fragment>
  )
}

function KeySignatureButtons ({letters, onClick}) {
  return (
    <div className="Answers">
      {letters.map((key) => (
        <button key={key} onClick={onClick}>
          <KeySignature letter={key} />
        </button>
      ))}
    </div>
  )
}

function Banner ({color, children}) {
  return (
    <div className='Result' style={{ background: color }}>
      <div style={{position: 'relative'}}>
        {children}
      </div>
    </div>
  )
}

function LevelHeader ({type, remainingCount}) {
  return (
    <h2 style={{fontWeight: 300}}>
      {type} ({remainingCount} left)
    </h2>
  )
}

function KeySignatureImage ({letter, clef, type}) {
  const [first, second] = letter.split('')
  const cssSecond = (second || '').replace("#", "s").replace("b", "f")
  const cssLetter = first + cssSecond
  const className = `${clef}-${cssLetter.toLowerCase()}-${type}`

  return (
    <div className={`App-logo ${className}`} />
  )
}

function Prize () {
  return (
    <a href={prizeLink} target='_blank' rel="noreferrer" style={{color: 'white'}}>
      Click here for prize!
    </a>
  )
}

function RobotoFont () {
  return (
    <Fragment>
      <link rel="preconnect" href="https://fonts.gstatic.com" /> 
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;900&display=swap" rel="stylesheet"/>
      <style>{'* { font-family: Roboto }'}</style>
    </Fragment>
  )
}

export default App;
