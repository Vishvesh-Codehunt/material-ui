import React from 'react'
import { useState } from 'react';
import { Typography, Button, Container, makeStyles, TextField, RadioGroup, FormControlLabel, FormControl, FormLabel, Radio } from '@material-ui/core'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  spaceTop:{
    marginTop:20
  },
  field:{
    marginTop:10,
    marginBottom:10
  }
})

export default function Create() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsErrors] = useState(false);
  const [category, setCategory] = useState('todos');

  const handleSubmit = (e) =>{
    e.preventDefault();

    setDetailsErrors(false);
    setTitleError(false);

    if(title == ''){
      setTitleError(true);
    }
    if(details == ''){
      setDetailsErrors(true);
    }

    if(title && details){
      fetch("http://localhost:8000/notes", {
        method: "post",
        headers: ({"Content-type": "application/json"}),
        body: JSON.stringify({title, details, category})
      }). then(() => history.push("/"))
    }
  }

  const classes = useStyles();
  return (
    <Container>
      <Typography 
        variant='h6'
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        Create a New Note
      </Typography>


    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
      <TextField
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className={classes.field}
        variant='outlined'
        label="Note Title"
        required 
        color="secondary"
        fullWidth
        error={titleError}
      >
      </TextField>
      
      <TextField
        onChange={(e) => {
          setDetails(e.target.value);
        }}
        className={classes.field}
        variant='outlined'
        label="Note Description"
        rows={4}
        multiline
        fullWidth
        required
        color="secondary"
        error={detailsError}
      >
      </TextField>

      <FormControl className={classes.field}>
      <FormLabel>Note Category</FormLabel>
      <RadioGroup value={category} onChange={(e) => {setCategory(e.target.value)}}>
        <FormControlLabel control={<Radio />} value="money" label="Money" />
        <FormControlLabel control={<Radio />} value="todos" label="todos" />
        <FormControlLabel control={<Radio />} value="reminders" label="reminders" />
        <FormControlLabel control={<Radio />} value="work" label="work" />
      </RadioGroup>
      </FormControl>

      <br />
      <Button
        className={classes.spaceTop}
        type='submit'
        variant='contained'
        color='secondary'
        endIcon={<KeyboardArrowRightIcon/>}

      >
        Submit
      </Button>

      </form>

    </Container>
  )
}
