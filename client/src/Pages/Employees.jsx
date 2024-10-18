import { useEffect, useState } from "react"
import EmployeeForm from "../components/EmployeeForm"
import '../index.css'

function Employees(){

    const[employees, setEmployees]=useState([])
    const[search, setSearch]=useState("")

    useEffect(()=> {
        fetch('http://127.0.0.1:5555/employees')
        .then((res) => res.json())
        .then((employeesData) => {
                              console.log(employeesData)
                              setEmployees(employeesData)
                            })
        .catch((error) => console.error('Error fetching employees',error)) 
    },[])


       // handling submit
    function handleEmployeeSubmit(newEmployee){
        setEmployees([...employees, newEmployee])
    }

    // Handle employee delete
    function handleEmployeeDelete(id){

        console.log("Deleting employee with ID:", id)
     
        //delete warning and putting a password
        if(window.confirm("Only the store manager can delete this employee")){
          const password=window.prompt("Please enter your password")
      
 
        if(password==='123'){
          fetch(`http://127.0.0.1:5555/employees/${id}`,{
             method: "DELETE",
           })
          .then((res) => res.json())
          .then(() => setEmployees(employees.filter(employee => employee.id !== id)))
          .catch((error) => console.error("Error deleting employee",error))
 
          }else{
         alert('Incorrect password')
        }
       }  
     }

    //  Handling search employee
    const filteredEmployees =employees.filter((employee) =>
        
        employee.name.toLowerCase().includes(search.toLowerCase())
    )

 

    return(
        <>
           <h1>Employees</h1>

           <div >
                <input className="search" onChange={(event) =>setSearch(event.target.value)} value={search} placeholder="Search Employee Name" type="search"/>
           </div>

           <div>
                <EmployeeForm onAddEmployee={handleEmployeeSubmit}/>
           </div>

           <div>
               <table >
                   <thead>
                        <tr>
                            <th>EMPLOYEE ID</th>
                            <th>NAME</th>
                            <th>ROLE</th>
                            <th>DEPARTMENT</th>
                            <th>DELETE</th>
                        </tr>
                   </thead>
                   
                   <tbody>
                         {filteredEmployees.map((employee) =>(
                            <tr key={employee.id || Math.random().toString()}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.role}</td>
                                <td>{employee.department}</td>
                                <td><button onClick={() =>handleEmployeeDelete(employee.id)} >DELETE</button></td> 

                            </tr>
                         ))}

                   </tbody>
               </table>
           </div>
        </>
    )
}

export default Employees