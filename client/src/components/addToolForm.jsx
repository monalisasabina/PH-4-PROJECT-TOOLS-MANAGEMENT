import { useState } from "react"

function AddToolForm({onAddTool}){

    const[name ,setName] =useState('')
    const[brand, setBrand] = useState('')
    const[noOfTools, setNoOfTools] = useState('')
    const[image,setImage] = useState('')


    //Name field
    function handleNameChange(event){
        setName(event.target.value)
        console.log(event.target.value)
    }

    // Brand field
    function handleBrandChange(event){
        setBrand(event.target.value)
        console.log(event.target.value)
    }

    // No. of Tools
    function handleToolsChange(event){
        setNoOfTools(event.target.value)
        console.log(event.target.value)
    }

    // Image
    function handleImageChange(event){
        setImage(event.target.value)
        console.log(event.target.value)
    }

    // Submitting the new tool
    function handleAddToolSubmit(event){

            event.preventDefault()
    
            const toolsData={
                name:name,
                brand:brand,
                no_of_tools:noOfTools,
                image:image,
                available_tools:noOfTools,
            }
            console.log("Tools Data:",toolsData)
    
            fetch(`http://127.0.0.1:5555/tools `, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(toolsData),
              })
                .then((res) => res.json())
                .then((newTool) => {
                    onAddTool(newTool)
                    console.log("API Response:",newTool)
                })
                .catch((error) => {
                    console.error("Error adding tool:",error)})
               
        
                // resetting field form
                setName('');
                setBrand('');
                setNoOfTools('');
                setImage('')
        
    }

    return(

        <>
          <form className="tools_form" onSubmit={handleAddToolSubmit}>
            <label htmlFor="name">NAME:</label>
            <input onChange={handleNameChange} value={name} type="text" placeholder="Enter Tool Name"/>

            <label htmlFor="brand">BRAND:</label>
            <input onChange={handleBrandChange} value={brand} type="text" placeholder="Enter Tool's Brand"/>

            <label htmlFor="no_of_tools">NUMBER OF TOOLS BROUGHT:</label>
            <input onChange={handleToolsChange} value={noOfTools} type="number" placeholder="Enter Total Tool Number"/>

            <label htmlFor="image">IMAGE:</label>
            <input onChange={handleImageChange} value={image} type="text" placeholder="Enter Tool Name"/>

            <button type="submit">SUBMIT</button>

          </form>

        </>
    )
}

export default AddToolForm