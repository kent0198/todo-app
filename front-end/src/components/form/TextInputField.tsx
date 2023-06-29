import { Form } from 'react-bootstrap'
import {FieldError, RegisterOptions, UseFormRegister } from "react-hook-form"

interface TextInputFieldProps{
    name:string,
    label:string,
    register:UseFormRegister<any>,
    registerOptions?:RegisterOptions,
    error?:FieldError,
    [x:string]:any,
}

const TextInputField = (props:TextInputFieldProps) => {
    const {prop}=props;
  return (
        <Form.Group controlId={prop.name+"input"}>
            <Form.Label>{prop.lable}</Form.Label>
            <Form.Control  
                {...props} 
                {...prop.register(prop.registerOptions,prop.name)}
                isInvalid={!!prop.error}
            />
            <Form.Control.Feedback type='invalid'>
                {prop.error?.message }
            </Form.Control.Feedback>
        </Form.Group>
  )
}

export default TextInputField