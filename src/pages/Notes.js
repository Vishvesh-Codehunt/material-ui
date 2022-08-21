import React, { useEffect, useState } from 'react'
import { Paper, Grid, Container } from '@material-ui/core';
import NoteCard from '../components/NoteCard';

export default function Notes() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, [])

  return (
    <Container>
      <Grid container spacing={3}>
      {notes.map(note => (
        <Grid item xs={8} md={6} lg={4} key={note.id}>
          {/* <Paper>{note.title}</Paper> */}
          <NoteCard note={note}></NoteCard>
        </Grid>
      ))}
      </Grid>

    </Container>
  )
}
