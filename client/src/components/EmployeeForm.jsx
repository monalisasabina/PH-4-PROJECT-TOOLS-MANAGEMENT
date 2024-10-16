import { useState } from "react"

function EmployeeForm({onAddEmployee}){

    const[name, setName]=useState([])
    const[role, setRole]=useState([])
    const[department, setDepartment]=useState([])
    
    //Name field
    function handleNameChange(event){
        setName(event.target.value)
        console.log(event.target.value)
    }

    // Role field
    function handleRoleChange(event){
        setRole(event.target.value)
        console.log(event.target.value)
    }

    // Department field
    function handleDepartmentChange(event){
        setDepartment(event.target.value)
        console.log(event.target.value)
    }

    // Submitting the form
    function handleEmployeeSubmit(event){

        // event.preventDefault()

        const employeeData={
            name:name,
            role:role,
            department:department
        }
        console.log(employeeData)

        fetch(`http://127.0.0.1:5555/employees `, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
          })
            .then((res) => res.json())
            .then((newEmployee) => onAddEmployee(newEmployee));
           
    
            // resetting field form
            setName('');
            setRole('');
            setDepartment('');
        
    }


    return(
        <>
          <form onSubmit={handleEmployeeSubmit} className="records_form">
            <label htmlFor="name">NAME</label>
            <input onChange={handleNameChange} value={name} type="text" placeholder="Enter Employee Name"/>

            <label htmlFor="role">ROLE</label>
            <input onChange={handleRoleChange} value={role} type="text" placeholder="Enter Employee's Role"/>

            <label htmlFor="department">DEPARTMENT</label>
            <input onChange={handleDepartmentChange} value={department} type="text" placeholder="Enter Employee's Department"/>

            <button type="submit" >SUBMIT</button>

          </form>
        </>
    )
}

export default EmployeeForm