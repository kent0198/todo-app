import {User} from "@model/user"
import { Form, useForm } from "react-hook-form";
import { SignUpCredenttials } from "@api/notes.api";
import * as NotesApi  from "@api/notes.api"
import { Button, Modal } from "react-bootstrap";
import TextInputField from "@comp/form/TextInputField";
import {css} from "@emotion/css"
import {DevTool} from "@hookform/devtools"

interface SignUpModalProps{
    onDismiss:()=>void,
    onSignUpSuccessful:(user:User)=>void,
}

const SignUpModal = ({onDismiss,onSignUpSuccessful}:SignUpModalProps) => {
  

    const {register,handleSubmit,formState, control}=useForm<SignUpCredenttials>();

    async  function onSubmit(credentials:SignUpCredenttials){
        try{
            const newUser= await  NotesApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        }catch(error){
            alert(error)
            console.log(error)
        }
    }

  return (
       /*  <Modal show onHide={onDismiss}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        SignUp
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form >
                      <TextInputField
                             name="username"
                             label="Username"
                             type="text"
                             placeholder="Username"
                             register={register}
                             registerOptions={{ required: "Required" }}
                             error={errors.username}
                    />
                      <TextInputField
                           name="email"
                           label="Email"
                            type="email"
                           placeholder="Email"
                           register={register}
                          registerOptions={{ required: "Required" }}
                         error={errors.email}
                       />
                      <TextInputField
                           name="password"
                           label="Password"
                            type="Password"
                           placeholder="Password"
                           register={register}
                          registerOptions={{ required: "Required" }}
                         error={errors.password}
                       />
                       <Button type="submit" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
                            Sign up
                       </Button>
                    </Form>
                </Modal.Body>
        </Modal> */
        <div className={sContent} >
           <div className={sheader}>
                Sign Up
           </div>
        <hr />
        <form className={sBlog}>
            <div className={sInputTilte}>
                <div className={sTitle}>Username</div>
                <input placeholder="username" autoFocus type="text" className={sInput} id="title" {...register("username")}/>
            </div>
            <div className={sInputTilte}>
                <div className={sTitle}>Email</div>
                <input placeholder="email" type="text" className={sInput} {...register("email")}/>
            </div>
            <div className={sInputTilte}>
                <div className={sTitle}>Password</div>
                <input placeholder="password" type="password" className={sInput} {...register("password")}/>
            </div>
        </form>
    {/*     <DevTool control={control}/> */}
        <button className={pulse}  onClick={handleSubmit(onSubmit)} >Sign Up</button>
        
       </div>
  )
}

export default SignUpModal


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
