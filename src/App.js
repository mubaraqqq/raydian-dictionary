import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WordProfile from './components/WordProfile';
import { Card, CardContent, Typography } from '@mui/material';

function App() {
  const [random, setRandom] = useState('');

  useEffect(() => {
    axios
      .get('https://random-words-api.vercel.app/word')
      .then((res) => {
        setRandom(res.data[0].word);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);
  console.log(random)

  return (
    <div className="App">
      {
        random && <WordProfile word={random} />
      }
    </div>
  );
}

export default App;
