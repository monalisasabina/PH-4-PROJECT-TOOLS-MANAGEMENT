import { useState } from "react"

function StoreEmployeesForm({onAddStoreEmployee}){

    const[name, setName]= useState([])
    const[role, setRole]= useState([])

    // Name Field
    function handleNameChange(event){
        setName(event.target.value)
        console.log(event.target.value)
    }

    // Role Field
    function handleRoleChange(event){
        setRole(event.target.value)
        console.log(event.target.value)
    }

    // Submitting store employee form
    function handleStoreEmployeeSubmit(){

         // event.preventDefault()

         const storeEmployeeData={
            name:name,
            role:role,
            
        }
        console.log(employeeData)

        fetch(`http://127.0.0.1:5555/storeemployees `, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(storeEmployeeData),
          })
            .then((res) => res.json())
            .then((newStoreEmployee) => onAddStoreEmployee(newStoreEmployee));
           
    
            // resetting field form
            setName('');
            setRole('');
         
    }
   
    return(

        <>
          <form onSubmit={handleStoreEmployeeSubmit} className="records_form">
             <label htmlFor="name">NAME</label>
             <input onChange={handleNameChange} value={name} type="text" placeholder="Enter Employee Name"/>

             <label htmlFor="role">ROLE</label>
             <input onChange={handleRoleChange} value={role} type="text" placeholder="Enter Employee's Role"/>

             <button type="submit" >SUBMIT</button>

          </form>
        
        </>
    )



}

export default StoreEmployeesForm