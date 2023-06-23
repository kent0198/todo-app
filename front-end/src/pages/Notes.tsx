import React , {useEffect, useState,useCallback} from "react"
import { Note as NoteModel} from "../models/note"
import Note from "../components/Note"
import { css } from "@emotion/css"
import * as NotesApi from "@api/notes.api"
import AddNoteDialog from "@comp/AddNoteDialog"
import { colorPrimaryState, isModalAboutShowState } from '@store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

const Notes = () => {


 /*  const [showAddNoteDialog, setShowAddNoteDialog]= React.useState(false); */
  const [notes, setNotes]=useState<NoteModel[]>([]);
  const [isShowAboutModal, setIsShowAboutModal] = useRecoilState(isModalAboutShowState);

    useEffect(()=>{
      async function loadNotes(){
        try{
          const response= await NotesApi.fetchNotes()
          setNotes(response)
        }catch(error){
          alert(error);
        }
      } 
      loadNotes();
    },[]) 
    
    const handleAboutClick = useCallback(() => {
      setIsShowAboutModal(true);  
    }, [])


  return (
    <div>
      <button  onClick={ handleAboutClick }>Add new note</button>
      <div className={sContainer}>
        {notes.map(note=>( 
          <Note note={note} key={note._id}/>
          ))}
     </div>
       {isShowAboutModal && <AddNoteDialog />}
  </div>
  )
}

export default Notes

const sContainer=css`
    padding-top: 10rem;
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    gap:20px;
`


