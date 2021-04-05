import './App.css';
import Sidebar from './Sidebar';
import Main from './Main';

import { useEffect, useState } from 'react';
import uuid from "react-uuid";

function App() {

  // array of note being stored in a state
  // creating an array of getters(notes) and setters(setNotes)

  const [ notes, setNotes ] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const [ activeNote, setActiveNote ] = useState(false); // this is to toggle over the list of notes created by the user on the sidebar
  //..... which in turn shows the user the active note on the main bar

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const onAddNote = () => {

    const newNote = {
      
      id: uuid(),

      title: "Untitled Note",

      body: "",

      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };


  const onUpdateNote = (updatedNote) =>{

    const updatedNotesArray = notes.map((note) => {
      if(note.id === activeNote){
        return updatedNote;
      }

      return note;
    });
  
    setNotes(updatedNotesArray);
  };




  // this is to delete the note that the user wants to delete
  const onDeleteNote = (idToDelete) => {

    setNotes(notes.filter((note) => note.id !== idToDelete));

  };

  // this is to get the object of the active note chosen by the user and return that object
  const getActiveNote = () => {

    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="App">
      
      {/* importing Sidebar and Main */}

      <Sidebar 
      
        //getter and setters
        notes = {notes} 
        onAddNote = {onAddNote} 
        onDeleteNote = {onDeleteNote} 
        activeNote = {activeNote}
        setActiveNote = {setActiveNote}
      />

      {/* this is a automatically running function as a prop because we want it to run all the time */}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />

    </div>
  );
}

export default App;
