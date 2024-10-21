import { useEffect, useState } from "react"
import StoreEmployeesForm from "../components/StoreEmployeeForm"


function StoreEmployees(){

    const[storeEmployees, setStoreEmployee]= useState([])
    const[search ,setSearch]= useState("")

    useEffect(() =>{
        fetch('http://127.0.0.1:5555/storeemployees')
        .then((res) => res.json())
        .then((storeEmployeesData) => {
                              console.log(storeEmployeesData)
                              setStoreEmployee(storeEmployeesData)
                            })
        .catch((error) => console.error('Error fetching employees',error))
    },[])


    // Handle employee delete
    function handleStoreEmployeeDelete(id){

        console.log("Deleting employee with ID:", id)
     
        //delete warning and putting a password
        if(window.confirm("Only the store manager can delete this store employee")){
          const password=window.prompt("Please enter your password")
      
 
        if(password==='123'){
          fetch(`http://127.0.0.1:5555/storeemployees/${id}`,{
             method: "DELETE",
           })
          .then((res) => res.json())
          .then(() => setStoreEmployee(storeEmployees.filter(storeEmployee => storeEmployee.id !== id)))
          .catch((error) => console.error("Error deleting store employee",error))
 
          }else{
         alert('Incorrect password')
        }
       }  
     }

    // handling submit
    function handleStoreEmployeeSubmit(newStoreEmployee){
        setStoreEmployee([...storeEmployees, newStoreEmployee])
    }

    //  Handling search store employee
    const filteredStoreEmployees =storeEmployees.filter((storeEmployee) =>
        
        storeEmployee.name.toLowerCase().includes(search.toLowerCase())
    )

    return(
        <>
           <h1>StoreEmployees</h1>

           <div >
                <input className="search" onChange={(event) =>setSearch(event.target.value)} value={search} placeholder="Search Store Employee Name" type="search"/>
           </div>

           <div>
               <StoreEmployeesForm onAddStoreEmployee={handleStoreEmployeeSubmit}/>
           </div>

           <div>
               <table>
                   <thead>
                        <tr>
                            <th>STORE EMPLOYEE ID</th>
                            <th>NAME</th>
                            <th>ROLE</th>
                            <th>DELETE</th>
                        </tr>
                   </thead>
                   
                   <tbody>
                         {filteredStoreEmployees.map((storeEmployee) =>(
                            <tr key={storeEmployee.id || Math.random().toString()}>
                                <td>{storeEmployee.id}</td>
                                <td>{storeEmployee.name}</td>
                                <td>{storeEmployee.role}</td>
                               <td><button onClick={() =>handleStoreEmployeeDelete(storeEmployee.id)} >DELETE</button></td> 

                            </tr>
                         ))}

                   </tbody>
               </table>
           </div>
           
        </>
    )
}

export default StoreEmployees