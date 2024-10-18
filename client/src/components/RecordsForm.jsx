import { useState } from "react"

function RecordsForm({onAddRecord}){

    const[toolId, setToolId]=useState('')
    const[employeeId, SetEmployeeId]=useState('')
    const[storeEmployeeId, setStoreEmployeeId]=useState('')
    const[dateReturned, setDateReturned]=useState('')

   

    // tool_id field
    function handleToolId(event){
        setToolId(event.target.value)
        console.log(event.target.value)
    }

    // Employee_id field
    function handleEmployeeID(event){
        SetEmployeeId(event.target.value)
        console.log(event.target.value)
    }

    // Store Employee_Id field
    function handleStoreEmployeeId(event){
        setStoreEmployeeId(event.target.value)
        console.log(event.target.value)
    }


    // Date Returned field
    function handleDateReturned(event){
        setDateReturned(event.target.value)
        console.log(event.target.value)
    }

    // Submitting the form
    function handleSubmit(event){

        // event.preventDefault()
    
        const recordData= {
            tool_id:toolId,
            employee_id:employeeId,
            store_employee_id:storeEmployeeId,
            date_returned:dateReturned
          }
          console.log(recordData);
    
          fetch(`http://127.0.0.1:5555/records `, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recordData),
          })
            .then((res) => res.json())
            .then((newRecord) => onAddRecord(newRecord));
           
    
            // resetting field form
            setToolId('');
            SetEmployeeId('');
            setStoreEmployeeId('');
            setDateReturned('');
            
        }   

        
        

     return(
        <div>
            <form className="records_form" onSubmit={handleSubmit}>
                <label htmlFor="tool_id">Tool ID: </label>
                <input onChange={handleToolId} value={toolId} placeholder="Enter Tool Id" type="number"/>

                <label htmlFor="employee_id">Employee ID:</label>
                <input onChange={handleEmployeeID} value={employeeId} placeholder="Enter Employee Id" type="number"/>

                <label htmlFor="store_employee_id">Store Employee ID:</label>
                <input onChange={handleStoreEmployeeId} value={storeEmployeeId} placeholder="Enter Store Employee Id" type="number"/>

                {/* <label htmlFor="date_returned">Date Returned:</label>
                <input onChange={handleDateReturned} value={dateReturned}  type="date"/> */}

                <button type="submit"> SUBMIT </button>
            </form>
        </div>
     )
}
export default RecordsForm