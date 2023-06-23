import React from 'react'
import { Note as NoteModel } from '../models/note'
import {css} from "@emotion/css"
import {formatDate} from "@type/formatDate"

interface NoteProps{
    note: NoteModel
}
const Note = ( props :NoteProps) => {


    const {note}=props;


    let createUpdatedText:string;
    if (note.updatedAt >note.createdAt){
        createUpdatedText="Updated: "+formatDate(note.updatedAt);
    }else{
        createUpdatedText="Created: "+formatDate(note.createdAt);
    }

    return (
        <div className={noteCard}>
            <div className={cardBody}>
                <div className={sTitle}>
                    {note.title}
                </div>
                <div className={cardText }>
                    {note.text}
                </div>
                <hr className={sHr}/>
                <div className={SstyleFooter}>
                    {createUpdatedText}
            </div>
            </div>
        </div>
  )
}

export default Note

const noteCard =css`
    background: linear-gradient(to top right, rgba(210, 221, 243, 0.8) 20%, rgba(252, 206, 200, 0.5) 120%);
    width: 25%;
    height: 130px;
    border-radius: 12px;
    box-shadow: 0 4px 4px #4385bb12;
    transition:box-shadow .2s ease-in-out;
    cursor: pointer;
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    }
`
const cardBody =css`
     overflow: hidden;
     mask-image: linear-gradient(180deg, #000 60%, transparent);
     align-items: center;
     justify-content: center;
     padding: 15px 0;
     
`

const cardText =css`
   font-size: 0.9rem;
    font-weight: 700;
    color: #060606;
    line-height: 1.5;
    margin-left:1.5rem;
`
const sTitle=css`

    font-size: 1.05rem;
    font-weight: 600;
    display: -webkit-box!important;
    max-height: 4.55em;
    overflow: hidden;
    line-height: 1.5;
    margin-bottom: 20px;
    justify-content: center;
`
const sHr=css`
    width: 20rem;
`
const SstyleFooter=css`
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
    justify-content: end;
    margin-right: 2em;
`