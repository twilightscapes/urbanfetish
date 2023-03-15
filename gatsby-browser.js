// import * as React from "react"
// import { StoreProvider } from "./src/context/store-context"



// export const wrapRootElement = ({ element }) => (

  
//   <StoreProvider>{element}</StoreProvider>
// )

export const onInitialClientRender = () => {
  setTimeout(function() {
      document.getElementById("___loader").style.display = "none"
  }, 1000)
}



export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This website has been updated since your last visit. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}





