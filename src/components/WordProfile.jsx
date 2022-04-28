import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box } from '@mui/material';
import firstLetterUpperCase from '../utils/firstLetterUpperCase';



const WordProfile = ({ word }) => {
  const [wordData, setWordData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
            console.log(res)
            setWordData(res.data[0]);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err.message);
            setIsLoading(false);
        })
  }, [word])

  
  if (isLoading) return <h1>Loading</h1>
    
  return (
    <>
        <Card  sx={{width: '90%', margin: '1em', padding: '0 1em'}}>
            <CardContent>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography variant="h5" component="div">
                        {firstLetterUpperCase(wordData.word)}
                    </Typography>
                    <audio src={wordData.phonetics[0].audio} controls/>
                </Box>
                <Typography variant="body1">
                    {wordData.phonetic}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {wordData.meanings[0].partOfSpeech}
                </Typography>
                <ol>
                    {
                        wordData.meanings[0].definitions.map((el, i) => (
                            <li key={i}>
                                <Typography variant="body2">
                                    {el.definition}
                                </Typography>
                            </li>
                        ))
                    }
                </ol>
            </CardContent>
        </Card>
    </>
  )
}

export default WordProfile