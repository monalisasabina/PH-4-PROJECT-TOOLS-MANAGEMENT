import NavBar from "./components/NavBar"
import { Outlet } from "react-router-dom";

function App(){

  return(
         <>
         <header>
              <NavBar/>
         </header>
         <Outlet/>
         
         </>

  )
}

export default App;