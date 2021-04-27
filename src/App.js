import './App.css';
import { useState } from 'react';

const pickRandom = arr => arr[Math.ceil(Math.random() * arr.length) - 1]

const major_letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'C#', 'F#', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Gb'
].sort()

const minor_letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G',
  'A#', 'C#', 'D#', 'G#',
  'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Gb'
].sort()

const letter = pickRandom(major_letters)

const className = letter.replace('#', 's')
                        .replace('b', 'f')
                        .toLowerCase() + '-maj'

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <div className={`App-logo treble-${className}`} />
        <div className="Answers">
          {major_letters.map(
            key => <button>{key}</button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
