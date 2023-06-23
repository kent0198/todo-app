import { Note } from "@model/note";

async function fetchdata(input :RequestInfo,init?:RequestInit){
    const response=await fetch(input, init);
    if(response.ok){
        return response;
    }
    else{
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