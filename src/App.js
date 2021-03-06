import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WordProfile from './components/WordProfile';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import firstLetterUpperCase from './utils/firstLetterUpperCase';

function App() {
  const [random, setRandom] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [suggested, setSuggested] = useState([]);
  const [word, setWord] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    // setRandom('');
  };

  const handleSelect = (e) => {
    setWord(e.target.innerText);
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
  }, [search]);
  
  if (isLoading) return <h1>Loading</h1>

  return (
    <Grid container spacing={1} className="App">
      <Grid item xs={6} sx={{width: '50%'}}>
        <Box sx={{padding: '1em'}}>
          {
            random && 
            <Card sx={{ width: '90%' }}>
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
          <input type="text" placeholder='Search for a word...' value={search} onChange={handleChange} />
          <Typography variant='body2'>{firstLetterUpperCase(word)}</Typography>
          {
            search &&
            <Box sx={{border: '1px solid grey', marginTop: '1em', width: '50%', borderRadius: '5%', padding: '0.5em'}}>
              {suggested.map(el => (
                <Box sx={{
                  padding: '0.1em',
                  borderBottom: '1px solid grey', 
                  cursor: 'pointer'}}
                  onClick={handleSelect} 
                  key={el.word}
                  >
                  {firstLetterUpperCase(el.word)}
                </Box>
              ))}
            </Box>
          }
        </Box>
      </Grid>
      <Grid item xs={6}>  
        {
          word && <WordProfile word={word} />
        }
      </Grid>
    </Grid>
  );
}

export default App;
