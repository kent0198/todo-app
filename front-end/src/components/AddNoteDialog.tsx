import React, { useCallback, useRef } from "react";
import {css} from '@emotion/css'
import { DefaultValue, useRecoilState, useRecoilValue } from "recoil";
import { isModalAboutShowState } from "@store/atoms";
import { Note } from "@model/note";
import { useForm } from 'react-hook-form';
import  {NoteInput} from '@api/notes.api'
import * as NotesApi from "@api/notes.api"

interface Props{
  onNoteSaved:(note:Note)=>void,
  noteToEdit?:Note,
  note?: Note,
}

const AddNoteDialog = ({note,onNoteSaved,noteToEdit}:Props) => {
  
 
 

  const { register, handleSubmit, formState: { errors  } } = useForm<NoteInput>({
    defaultValues: {
        title: noteToEdit?.title || "",
        text: noteToEdit?.text || "",
    }
  }
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [isShowModal, setIsShowModal] = useRecoilState(isModalAboutShowState);
  const modalRef = useRef<HTMLDivElement>(null);
 
  const handleContainerMouseClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current && modalRef.current) {
      if (!modalRef.current.contains(event.target as Node)) {
        setIsShowModal(false)
      }
    }
  }, [containerRef.current, modalRef.current])


  async function onSubmit (input:NoteInput){
    try {
        let noteResponse:Note;
        if (noteToEdit){
          noteResponse=await NotesApi.updateNote(noteToEdit._id, input)
        }else{
           noteResponse= await NotesApi.createNote(input);
        }
        onNoteSaved(noteResponse);;
    }catch(error){
        console.log(error);
        alert(error);
    }
  }
 
  return (
    <div className={Scontainer} ref={ containerRef } onClick={(e) => {handleContainerMouseClick(e)}}>
          <div className={sContent}  ref={ modalRef } >
                <div className={sheader}>
                   {noteToEdit ? "Edit note" : "Add note" }
                </div>
                <hr />
                <div className={sBlog}>
                    <div className={sInputTilte}>
                        <div className={sTitle}>Title</div>
                        <input placeholder="Title" autoFocus type="text" className={sInput} {...register("title",{required:"Required"})}/>
                    </div>
                    <div className={sInputTilte}>
                        <div className={sTitle}>Text</div>
                        <input placeholder="Text" type="text" className={sInput} {...register("text")}/>
                    </div>
                </div>
                <button className={pulse}  onClick={handleSubmit(onSubmit)} >Pulse</button>
          </div>
    </div>
  )
}

export default AddNoteDialog

export const Scontainer=css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(80, 80, 80, 0.4);
  z-index: 99999;
`
export const sContent=css`
   box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(4, 4, 4, 0.08) 0px 0px 0px 1px;
   width: 300px;
   height: 200px;
   background: white;
   border-radius: 10px;
`
export const sheader=css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  font-size: 20px;
  font-weight: 600;
  background-color: rgba(80, 80, 80, 0.4);
  border-radius: 10px;
`
export const sBlog=css`
  padding-top: 1rem;
`
export const sInputTilte=css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap:10px;
  will-change: contents;
  padding-bottom: 1rem;
`
export const sTitle=css`
  font-size: 15px;
  font-weight: 500;
`
export const sInput=css`
  border-radius: 5px;
  outline: none;
  &:focus{
    border: 3px solid  rgba(80, 80, 80, 0.4);
  }

`
const pulse=css`
  width: 80px;
  height: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(to top right, rgba(210, 221, 243, 0.8) 20%, rgba(252, 206, 200, 0.5) 120%);
  color: gray;
`
