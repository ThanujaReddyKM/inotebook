import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{  
    const notesInitial = [
        {
          "_id": "64957e265242e45e2ffacdc9",
          "user": "64957def5242e45e2ffacdc5",
          "title": "New Note",
          "description": "New Notes will have more upated one",
          "tag": "Hel",
          "date": "2023-06-23T11:12:38.605Z",
          "__v": 0
        },
        {
            "_id": "64957e265242e45e2ffacdc9",
            "user": "64957def5242e45e2ffacdc5",
            "title": "New Note !!!",
            "description": "New Notes will have more upated one !!!",
            "tag": "Hel",
            "date": "2023-06-23T11:12:38.605Z",
            "__v": 0
          }
      ]
      const [notes,setNotes] = useState(notesInitial)
    
 return(
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
 )
}

export default NoteState 










// import { useState } from "react";
// import NoteContext from "./NoteContext";

// const NoteState = (props)=>{
//     const s1= {
//         "name":"Thanuja",
//         "class":"Software Developer"
//     }
//    const [state,setState]= useState(s1);
//    const update = ()=>{
//     setTimeout(()=>{
//         setState({
//             "name":"Roshini",
//             "class":"CA"
//         })
//     },1000);
//    }
//  return(
//     <NoteContext.Provider value={{state:state,update:update}}>
//         {props.children}
//     </NoteContext.Provider>
//  )
// }

// export default NoteState 