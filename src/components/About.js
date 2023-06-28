import React from 'react'

const About = () => {
  return (
    <div>
      This is about Page
    </div>
  )
}

export default About



// import React,{ useContext, useEffect } from 'react'
// import NoteContext from '../context/notes/NoteContext'

// const About = () => {
//   const a = useContext(NoteContext)
//   useEffect(() => {
//     a.update();
//     // eslint-disable-next-line
//   }, [])
//   return (
//     <div>
//       This is about {a.state.name} and she his a {a.state.class}
//     </div>
//   )
// }

// export default About
