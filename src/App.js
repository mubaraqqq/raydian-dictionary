import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WordProfile from './components/WordProfile';
import { Card, CardContent, Typography } from '@mui/material';
import firstLetterUpperCase from './utils/firstLetterUpperCase';

function App() {
  const [random, setRandom] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://random-words-api.vercel.app/word')
      .then((res) => {
        setRandom(res.data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);
  
  if (isLoading) return <h1>Loading</h1>

  return (
    <div className="App">
      <Card sx={{ width: 700 }}>
        <CardContent>
            <Typography variant="h5" component="div">
                {firstLetterUpperCase(random.word)}
            </Typography>
            <Typography variant="body2">
                {random.definition}
            </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
