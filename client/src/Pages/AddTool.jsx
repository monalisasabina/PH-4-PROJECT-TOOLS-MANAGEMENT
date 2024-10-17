import { useState,useEffect } from "react"
import AddToolForm from "../components/addToolForm"

function AddTool(){

  const[tools, setTools] = useState([])
  const[newTool, setNewTool] =useState(null)

  useEffect(()=> {
    fetch('http://127.0.0.1:5555/tools')
    .then((res) => res.json())
    .then((toolsData) => {
                          console.log(toolsData)
                          setTools(toolsData)
                        })
    .catch((error) => console.error('Error fetching tools',error)) 
},[])

  
  // Handle Tool Submit
  function handleSubmitTool(newTool){

      setTools([...tools, newTool])
      setNewTool(newTool)
  }


    return(
        <>
          <h1>adding tools</h1>

          <AddToolForm  onAddTool={handleSubmitTool} />

          {/* One Tool card */}

          {newTool && (
             <div className="tool_card">
               <h2>New Tool Added</h2>
               <h3>{newTool.name}</h3>
               <img src={newTool.image}/>
               <p>Brand:{newTool.brand}</p>
               <p>Total number of tools bought: <strong> {newTool.no_of_tools} </strong> </p>
               <p>Purchase date: <strong>{newTool.purchase_date}</strong></p>
             
         </div>
          )}

        
        </>
    )
}
export default AddTool