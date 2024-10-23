import { useEffect, useState } from "react"
import StoreEmployeesForm from "../components/StoreEmployeeForm"
import StoreEmployeeDeleteModal from "../Modals/StoreEmployeeDeleteModal";


function StoreEmployees(){

    const[storeEmployees, setStoreEmployee]= useState([])
    const[search ,setSearch]= useState("")
    // modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStoreEmployeeId, setSelectedStoreEmployeeId] = useState(null);

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
    function handleStoreEmployeeDelete(password){
     
        if(password==='123'){
          fetch(`http://127.0.0.1:5555/storeemployees/${selectedStoreEmployeeId}`,{
             method: "DELETE",
           })
          .then((res) => res.json())
          .then(() => setStoreEmployee(storeEmployees.filter(storeEmployee => storeEmployee.id !== selectedStoreEmployeeId)))
          .catch((error) => console.error("Error deleting store employee",error))
 
          // Close modal after confirming the deletion
          setIsModalOpen(false);
          }else{
         alert('Incorrect password')
        
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
                                <td>
                                    <button onClick={() =>{
                                        setSelectedStoreEmployeeId(storeEmployee.id);
                                        setIsModalOpen(true)

                                    }} 
                                    >DELETE
                                    </button>
                                </td> 

                            </tr>
                         ))}

                   </tbody>
               </table>
           </div>

           <StoreEmployeeDeleteModal

               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
               onConfirm={handleStoreEmployeeDelete}
           
           />
           
        </>
    )
}

export default StoreEmployees