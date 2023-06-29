import React , {useEffect, useState,useCallback} from "react"
import { Note as NoteModel} from "../models/note"
import Note from "../components/Note"
import { css } from "@emotion/css"
import * as NotesApi from "@api/notes.api"
import AddNoteDialog from "@comp/AddNoteDialog"
import { colorPrimaryState, isModalAboutShowState } from '@store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Spinner } from "react-bootstrap"
import Loading from "@comp/Loading"
import SignUpModal from "@comp/SignUpModal"
import LoginModal from "@comp/LoginModal"
import NavbarModal from "@comp/NavbarModal"


const Notes = () => {


 /*  const [showAddNoteDialog, setShowAddNoteDialog]= React.useState(false); */
  const [notes, setNotes]=useState<NoteModel[]>([]);
  const [isShowAboutModal, setIsShowAboutModal] = useRecoilState(isModalAboutShowState);
  const [noteToEdit, setNoteToEdit]=React.useState<NoteModel|null>(null);

  const [noteLoading, setNoteLoading]=React.useState(true)
  const [showNoteLoadingError, setShowNoteLoadingError]=React.useState(false)

    useEffect(()=>{
      async function loadNotes(){
        try{
          setShowNoteLoadingError(false)
          setNoteLoading(true);
          const response= await NotesApi.fetchNotes()
          setNotes(response)
        }catch(error){
          alert(error);
          setShowNoteLoadingError(true)
        }finally{
          setNoteLoading(false)
        }
      } 
      loadNotes();
    },[]) 
    
    const handleAboutClick = useCallback(() => {
      setIsShowAboutModal(true);  
    }, [])


    async function deleteNote(note:NoteModel){
      try{
          await NotesApi.deleteNote(note._id)
          setNotes(notes.filter(existingNote=>existingNote._id !==note._id))
      }catch(error){
        console.log(error)
        alert(error);
      }
    }


    const noteGrip=

     <div className={sContainer}>
        {notes.map(note=>( 
          <Note 
            note={note} 
            key={note._id} 
            onDeleteNoteClicked={deleteNote}
            onNoteClicked={setNoteToEdit}
            />
          ))}
     </div>
  return (
    <>
    <div>
      <NavbarModal
        loggedInUser={null}
        onLoginClicked={() => {}}
        onSignUpClicked={() => {}}
        onLogoutSuccessful={() => {}}
      />
      <button  onClick={ handleAboutClick } className={sButton}>Add new note</button>
      
        {noteLoading && <Loading />}

        {showNoteLoadingError && <p>Something went wrong</p>}
        {!noteLoading && !showNoteLoadingError && 
        <>
          {
            notes.length >0 ? noteGrip : <p>You don't have any notes yet</p>
          }
        </>
        }
       {isShowAboutModal && 
          <AddNoteDialog 
          onNoteSaved={(newNote)=>{
            setNotes([...notes,newNote]);
            setIsShowAboutModal(false)}} /> 
          }

        {noteToEdit && 
        <AddNoteDialog
        noteToEdit={noteToEdit}
        onNoteSaved={(updateNote)=>{
          setNotes(notes.map(existingNode=>existingNode._id===updateNote._id ? updateNote:existingNode));
          setNoteToEdit(null);
        }}
        />
      }
        
        {false &&
          <SignUpModal
            onDismiss={()=>{}}
            onSignUpSuccessful={()=>{}}
            />
          }
        {
          true &&
          <LoginModal
          onDismiss={()=>{}}
          onLoginSuccessful={()=>{}}
          />
        }
    </div>
   </>
  )
}

export default Notes

const sContainer=css`
    padding-top: 5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    gap:20px;
`
const sButton=css`
   width: 100px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(to top right, rgba(210, 221, 243, 0.8) 20%, rgba(252, 206, 200, 0.5) 120%);
  color: gray;
`