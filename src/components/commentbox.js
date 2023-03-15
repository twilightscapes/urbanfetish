import React, { useEffect } from 'react'
import commentbox from 'commentbox.io'
import useSiteMetadata from "../hooks/SiteMetadata"


const ComBox = ()=>{
  const { comments } = useSiteMetadata()
  useEffect(() =>{
    commentbox(comments, {
      backgroundColor: null,  // default transparent
      textColor: "#222",  // default black
       subtextColor: "#222",  // default grey
   })
  })

  return(


    <div className="commentbox" />

  )

}
  
  export default ComBox
