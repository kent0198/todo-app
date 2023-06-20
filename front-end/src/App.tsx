import React , {useEffect, useState} from "react"
import { Note } from "./models/note"

function App() {
  
    const [notes, setNotes]=useState<Note[]>([]);

    useEffect(()=>{
      async function loadNotes(){
        try{
          const response= await fetch ("/api/notes",{method: "GET"});
          const notes = await response.json();
          setNotes(notes)
        }catch(error){
          console.log(error);
          alert(error);
        }
      } 
      loadNotes();
    },[])

  return (
    <>
     
    </>
  )
}

export default App
