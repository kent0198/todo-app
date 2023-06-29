import { Note } from "@model/note";
import { User } from "@model/user";

async function fetchdata(input :RequestInfo,init?:RequestInit){
    const response=await fetch(input, init);
    if(response.ok){
        return response;
    }
    else
    {
        const errorBody=await response.json();
        const errorMessage=errorBody.error;
        throw Error(errorMessage);
    }   
}

export async function fetchNotes():Promise<Note[]>{
    const response=await fetchdata("/api/notes", {method:"GET"});
    return response.json()

}


export interface NoteInput{
    title:string,
    text?:string,
}


export async function createNote(credentials: NoteInput): Promise<Note> {
    
    const response = await fetchdata("/api/notes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function deleteNote(noteId:string){
    await fetchdata("/api/notes/"+  noteId,{method:"DELETE"});
}

export async function updateNote (noteId:string, note:NoteInput):Promise<Note>{
    const response = await fetchdata("/api/notes/"+noteId,
    {
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(note)
        });
        return response.json();  
}

export async function getLoggedInUser ():Promise<User>{

    const response=await fetchdata("/api/users",{method:"GET"});

    return response.json();

}
export interface SignUpCredenttials{
    username:string,
    email:string,
    password:string,
}

export async function signUp(credentials:SignUpCredenttials):Promise<User>{
    const response=await fetchdata("/api/users/signup",{method:"POST",
    headers:{
        "Content-Type": "application/json",
    },
    body:JSON.stringify(credentials)
});
return response.json();
    
}

export interface LoginCredentials{
    username:string,
    password:string,
}
export async function login (credentials:LoginCredentials):Promise<User>{
    const response=await fetchdata("/api/users/login",{method:"POST",
    headers:{
        "Content-Type": "application/json",
    },
    body:JSON.stringify(credentials)
});
return response.json();
    
}

export async function logout(){
    await fetchdata("/api/users/logout",{method:"POST"});
}