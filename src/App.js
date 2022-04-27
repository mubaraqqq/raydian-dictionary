import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WordProfile from './components/WordProfile';
import { Card, CardContent, Typography, Box } from '@mui/material';
import firstLetterUpperCase from './utils/firstLetterUpperCase';

function App() {
  const [random, setRandom] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [suggested, setSuggested] = useState([]);
  let word;

  const handleChange = (e) => {
    setSearch(e.target.value);
    setRandom('');
  };

  const handleSelect = (e) => {
    word = e.target.innerText;
    setSearch('');
    setSuggested([]);
  }

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

  useEffect(() => {
    axios
      .get(`https://api.datamuse.com/sug?s=${search}`)
      .then((res) => {
        setSuggested(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [search])
  
  if (isLoading) return <h1>Loading</h1>

  return (
    <div className="App">
      {
        random && 
        <Card sx={{ width: 700 }}>
          <CardContent>
              <Typography variant='h4'>
                Random Word
              </Typography>
              <Typography variant="h5" component="div">
                  Word: {firstLetterUpperCase(random.word)}
              </Typography>
              <Typography variant="body2">
                  Definition: {random.definition}
              </Typography>
          </CardContent>
        </Card>
      }
      <Box>
        <input type="text" value={search} onChange={handleChange} />
        {
          search &&
          <Box>
            {suggested.map(el => (
              <Box sx={{
                padding: '0.5em',
                borderBottom: '1px solid grey'}}
                onClick={handleSelect} 
                key={el.word}
                >
                {firstLetterUpperCase(el.word)}
              </Box>
            ))}
          </Box>
        }
      </Box>
    </div>
  );
}

export default App;
