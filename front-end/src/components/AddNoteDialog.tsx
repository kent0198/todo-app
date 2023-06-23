import React, { useCallback, useRef } from "react";
import {css} from '@emotion/css'
import { useRecoilState, useRecoilValue } from "recoil";
import { isModalAboutShowState } from "@store/atoms";

interface Props{}

const AddNoteDialog = (props:Props) => {

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

 
  return (
    <div className={Scontainer} ref={ containerRef } onClick={(e) => handleContainerMouseClick(e)}>
          <div className={sContent}  ref={ modalRef } >
                <div className={sheader}>
                    Add note
                </div>
                <hr />
                <div className={sBlog}>
                    <div className={sInputTilte}>
                        <div className={sTitle}>Title</div>
                        <input placeholder="Title" autoFocus type="text" className={sInput}/>
                    </div>
                    <div className={sInputTilte}>
                        <div className={sTitle}>Text</div>
                        <input placeholder="Text" type="text" className={sInput}/>
                    </div>
                </div>
                <button className={sButton} type="submit">nice</button>
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
  &:focus{
    border: 2px solid  rgba(80, 80, 80, 0.4);
  }
`
const sButton=css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  
`