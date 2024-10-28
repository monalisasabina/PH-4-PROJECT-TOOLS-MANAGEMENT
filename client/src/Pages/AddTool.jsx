import { useState,useEffect } from "react"
import AddToolForm from "../components/addToolForm"

function AddTool(){

  const[tools, setTools] = useState([])
  const[newTool, setNewTool] =useState(null)

  useEffect(()=> {
    fetch('https://ph-4-project-tools-management-3.onrender.com/tools')
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
          <h1>Add Tools Here</h1>

          <div className="add_tool">
              <AddToolForm  onAddTool={handleSubmitTool} />
          </div>
         
          {/* Display message or tool card */}
          {newTool ? (
             <div className="add_tool_card">
                <h2>New Tool Added</h2>
                <h3 id="new_tool_title">{newTool.name}</h3>
                <img id="new_tool_image" src={newTool.image} />
                <p>Brand: <strong>{newTool.brand}</strong></p>
                <p>Total number of tools bought: <strong>{newTool.no_of_tools}</strong></p>
                <p>Purchase date: <strong>{newTool.purchase_date}</strong></p>
             </div>
          ) : (
              <div className="add_tool_empty_box">
                <h3>ADDED TOOL WILL APPEAR HERE</h3>
              </div>
           )}           
        </>
    )
}
export default AddTool