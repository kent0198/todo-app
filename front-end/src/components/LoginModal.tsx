import {User} from "@model/user"
import { Form, useForm } from "react-hook-form";
import { LoginCredentials } from "@api/notes.api";
import * as NotesApi  from "@api/notes.api"
import { Button, Modal } from "react-bootstrap";
import TextInputField from "@comp/form/TextInputField";
import {css} from "@emotion/css"
import {DevTool} from "@hookform/devtools"

interface LoginModalProps{
    onDismiss:()=>void,
    onLoginSuccessful:(user:User)=>void,
}

const LoginModal = ({onDismiss,onLoginSuccessful}:LoginModalProps) => {

    const {register,handleSubmit,formState, control}=useForm<LoginCredentials>();

    async  function onSubmit(credentials:LoginCredentials){
        try{
            const newUser= await  NotesApi.login(credentials);
            onLoginSuccessful(newUser);
           alert("nice");
        }catch(error){
            alert(error)
            console.log(error)
        }
    }
  return (
    <div className={sContent} >
           <div className={sheader}>
                Login
           </div>
        <hr />
        <form className={sBlog}>
            <div className={sInputTilte}>
                <div className={sTitle}>Username</div>
                <input placeholder="username" autoFocus type="text" className={sInput} id="title" {...register("username")}/>
            </div>
            <div className={sInputTilte}>
                <div className={sTitle}>Password</div>
                <input placeholder="password" type="password" className={sInput} {...register("password")}/>
            </div>
        </form>
    {/*     <DevTool control={control}/> */}
        <button className={pulse}  onClick={handleSubmit(onSubmit)} >Log in</button>
       </div>
  )
}

export default LoginModal

export const sContent=css`
   box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(4, 4, 4, 0.08) 0px 0px 0px 1px;
   width: 400px;
   height: 250px;
   background: white;
   border-radius: 10px;
   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  gap:20px;
  will-change: contents;
  padding-bottom: 1rem;
`
export const sTitle=css`
  font-size: 15px;
  font-weight: 500;
  width: 5rem;
`
export const sInput=css`
  border-radius: 5px;
  outline: none;
  &:focus{
    border: 3px solid  rgba(80, 80, 80, 0.4);
  }
`
export const pulse=css`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(to top right, rgba(210, 221, 243, 0.8) 20%, rgba(252, 206, 200, 0.5) 120%);
  color: gray;
`
