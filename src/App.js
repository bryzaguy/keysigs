/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import { Fragment, useState } from "react";

const random = range => Math.ceil(Math.random() * range) - 1
const pickRandom = arr => arr[random(arr.length)];

// TODO:
//   - Links allow playing previous levels, underline level like link, store completed levels rather than calculate.
//   - High score (correct answers are 100 pts)
//     - Streak multiplier (100 * 10)
//     - Time multiplier which (carries over?) (halves every 3 seconds) 10x, 5x, 2x
//   - Adjust pictures so all the key signature bars line up

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

var {currentLevel, levelsCompleted} = JSON.parse(
  localStorage.getItem('stats')
) || {currentLevel: 0, levelsCompleted: 0}

var solved = []

const play = (previous) => {
  const letters = [major_letters, minor_letters][currentLevel] || major_letters.concat(minor_letters)
  const letter = pickRandom(letters.filter(l => solved.indexOf(l) === -1))
  const type = major_letters.indexOf(letter) > -1 ? 'maj' : 'min'
  const clef = pickRandom(clefs)

  return { clef, type, letter, letters, previous }
};

const giphyApiKey = '6RG4B2rBB6eP4QCDrxs7w0uZnflH6n9z'
const giphy = search => fetch(
  `https://api.giphy.com/v1/gifs/search?api_key=${
    giphyApiKey
  }&q=${
    search
  }&limit=20&offset=${
    random(1000)
  }&rating=g&lang=en`
).then(a => a.json()).then(a => a.data.map(b => (
  [b.images.fixed_height.url, b.images.fixed_height.height, b.images.original.frames]
)))

var images = {
  success: [],
  fail: [],
  ready: []
}

var loaded = false
const allPromises = Promise.all([giphy('success'), giphy('fail'), giphy('ready')])
allPromises.then(([success, fail, ready]) => {
  images = {success, fail, ready}
})

function App() {
  const [game, setGame] = useState(null)
  const [banner, setBanner] = useState({title: 'Loading...'})

  if (!loaded) {
    allPromises.then(() => {
      setTimeout(() => {
        loaded = true
        setBanner({
          title: 'Ready?',
          splash: pickRandom(images.ready)
        })
      }, 500)
    })
  }

  const { clef, type, letter, letters = [], previous = {} } = game || {}
  const remainingCount = letters.length - solved.length

  const onClick = (e) => {
    var win = e.target.textContent === letter
    const count = previous.count + 1
    const streak = win ? (previous.streak || 0) + 1 : 0
    const losses = !win ? (previous.losses || 0) + 1 : 0
    win && solved.push(letter)

    if (solved.length === letters.length) {
      solved = []
      levelsCompleted = Math.min(levelsCompleted + 1, 3)
      currentLevel = Math.min(currentLevel + 1, levels.length - 1)
      localStorage.setItem('stats', JSON.stringify({currentLevel, levelsCompleted}))
      setBanner({
        title: levelsCompleted === 3 ? <Prize /> : pickRandom(wins),
        splash: pickRandom(images.success),
        color: 'green'
      })
      setGame(null)
    } else {
      if (win) {
        const color = 'green'
        if (streak > 1) {
          setBanner({
            title: (
              <span style={{fontSize: 'smaller'}}>
                {streak} POINT STREAK!
              </span>
            ),
            color
          })
        } else {
          setBanner({title: pickRandom(wins), color})
        }
        setGame(play({ count, streak, losses, win, lastLetter: letter }))
      } else {
        const fail = {
          title: (
            <KeySignature letter={letter}>
              {pickRandom(fails)}...
            </KeySignature>
          ),
          color: 'red'
        }

        const splash = pickRandom(images.fail)
        setBanner({
          splash: splash,
          ...fail
        })
        const frames = parseInt(splash[2])
        const fps = 1000 / 15
        const latency = 1000
        const wait = Math.max((frames * fps) + latency, 5000)
        setTimeout(() => {
          setBanner(fail)
          setGame(play({ count, streak, losses, win, lastLetter: letter }))
        }, wait)
      }
    }
  };

  const onPlayClick = () => {
    setBanner({title: 'GO!'})
    setGame(play({count: 0}))
  }

  const onLevelClick = levelIndex => {
    currentLevel = levelIndex
    setGame(null)
    setBanner({title: 'Ready?', splash: pickRandom(images.ready)})
  }

  const [url, height] = banner.splash || []
  const letterButtons = type === 'maj' ? major_letters : minor_letters

  return (
    <div className="App">
      <RobotoFont />
      <header className="App-header">
        <Banner color={banner.color} height={height && `calc(${height}px + 3.5rem)`}>
          {banner.title}
          {url && <img src={url} style={{maxWidth: '100%', marginTop: '0.5rem'}} />}
        </Banner>
        <LevelStars level={currentLevel} onClick={onLevelClick} />
        {letter && (
          <Fragment>
            <LevelHeader type={levelLabel[type]} remainingCount={remainingCount} />
            <KeySignatureImage letter={letter} clef={clef} type={type} />
            {!banner.splash && (
              <KeySignatureButtons letters={letterButtons} onClick={onClick} />
            )}
          </Fragment>
        )}
        {game == null && <PlayButton onClick={onPlayClick} />}
      </header>
      {loaded && <LoadImages />}
    </div>
  );
}

function PlayButton ({onClick}) {
  return (
    <button style={{fontSize: '1.5rem', padding: '1rem'}} onClick={onClick}>Play!</button>
  )
}

function LoadImages () {
  const {success, fail, ready} = images
  return (
    <div style={{height: 0, width: 0, position: 'absolute', overflow: 'hidden'}}>
      {success.concat(fail).concat(ready).map(url => <img key={url} src={url} />)}
    </div>
  )
}

function LevelStars ({level, onClick = () => {}}) {
  return (
    <div className="LevelStars">
      {levels.map((_, levelIndex) => {
        const isCurrentLevel = level === levelIndex
        const isComplete = level > levelIndex || levelsCompleted === 3
        const color = isComplete ? 'green' : (
          isCurrentLevel ? 'darkgrey' : 'lightgrey'
        )
        const animation = [
          isComplete && 'wow',
          isCurrentLevel && 'pulse',
        ].filter(a => a).join(' ')

        const style = {
          border: '1px solid #CCC',
          padding: '0.25rem 0.5rem',
          borderRadius: '3px',
          boxShadow: `2px 4px 6px rgba(0,0,0,${isCurrentLevel ? '0.35' : '0.15'})`,
          opacity: !isComplete && !isCurrentLevel && 0.5
        }

        const onLevelClick = () => isComplete && onClick(levelIndex)

        return (
          <span key={levelIndex} className="LevelStar" style={style} onClick={onLevelClick}>
            <span>Level {levelIndex + 1}:</span> &nbsp;
            <Star color={color} animation={animation} />
          </span>
        )
      })}
    </div>
  )
}

function Star ({color, animation}) {
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
    <span>{children}{first}<span className="KeyAugment">{second || ''}</span></span>
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

function Banner ({color, height, children}) {
  return (
    <div className='Result' style={{ backgroundColor: color || 'lightgrey' }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: '0.5s',
        overflow: 'hidden',
        height: height || '3rem'        
      }}>
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
