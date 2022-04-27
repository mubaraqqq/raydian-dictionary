import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import firstLetterUpperCase from '../utils/firstLetterUpperCase';



const WordProfile = ({ word }) => {
  const [wordData, setWordData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
            setWordData(res.data[0]);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
  }, [word])

  console.log(wordData);
  console.log(isLoading);
  
  if (isLoading) return <h1>Loading</h1>
    
  return (
    <Card sx={{ width: 700 }}>
    <CardContent>
        <Typography variant="h5" component="div">
            {firstLetterUpperCase(wordData.word)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {wordData.meanings[0].partOfSpeech}
        </Typography>
        <Typography variant="body2">
            {wordData.meanings[0].definitions[0].definition}
            <br />
            {'"a benevolent smile"'}
        </Typography>
    </CardContent>
    </Card>
  )
}

export default WordProfile