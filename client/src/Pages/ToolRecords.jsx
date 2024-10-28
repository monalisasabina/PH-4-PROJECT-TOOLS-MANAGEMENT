import { useState,useEffect } from "react"
import RecordsForm from "../components/RecordsForm"
import ToolRecordsDeleteModal from "../Modals/ToolRecordsModal"
import './Table.css'
import { Link } from "react-router-dom"

function ToolRecords(){

    const[toolRecords, setToolRecords]=useState([])
    const[search, setSearch] =useState("")
    // modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedToolRecordId, setSelectedToolRecordId] = useState(null);

    // Fetching the toolrecords
    useEffect(()=>{
        fetch('https://ph-4-project-tools-management-3.onrender.com/records')
        .then((res) => res.json())
        .then((toolRecordsData) => {
                              console.log(toolRecordsData)
                              setToolRecords(toolRecordsData)
                            })
        .catch((error) => console.error('Error fetching tools',error))                    


    },[])
    
    // handling submit
    function handleRecordFormSubmit(newRecord){
        setToolRecords([...toolRecords, newRecord])
    }

    // Handling record delete
    function handleRecordDelete(password){

 
        if(password==='123'){
          fetch(`https://ph-4-project-tools-management-3.onrender.com/records/${selectedToolRecordId}`,{
             method: "DELETE",
           })
          .then((res) => res.json())
          .then(() => setToolRecords(toolRecords.filter(record => record.id !== selectedToolRecordId)))
          .catch((error) => console.error("Error deleting Tool record",error))
 
          // Close modal after confirming the deletion
          setIsModalOpen(false);

          }else{
         alert('Incorrect password')
        
       }  
     }


    //  search filter
    const filteredToolRecords =toolRecords.filter((record) =>

        record.employee_id.toString().includes(search)
    
    )

    // handling date returned update
    function handleDateReturnedUpdate(id){

        const newDateReturned =prompt("Enter the Date Returned (dd mm yyyy:")

        if (newDateReturned){

            const [day, month,year] = newDateReturned.split(" ");
            const formattedDate = `${year}-${month}-${day}`

            fetch(`https://ph-4-project-tools-management-3.onrender.com/records/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date_returned: formattedDate }),
            })
            .then((res) => res.json())
            .then((updatedRecord) => {
                setToolRecords((toolRecords) => toolRecords.map(record => 
                    record.id === id ? updatedRecord : record
                ));

                // The window wasn't reloading as it should, I have included:
                window.location.reload()
            })
            .catch((error) => console.error('Error updating date returned', error));
        }

    }
 
    return(
        <>
           <h1> Tool Records</h1>

           <div>
                 <Link className="link" to={`/employees`}>View Employee List</Link>

                 <Link className="link" to={`/storeemployees`}>View Store Employee List</Link>
           </div>

           <div >
                <input className="search" onChange={(event) =>setSearch(event.target.value)} value={search} placeholder="Search Employee ID" type="search"/>
           </div>

           <div>
               <RecordsForm onAddRecord={handleRecordFormSubmit}  />
           </div>

           <div className="table_div">
               <table className="table">
                   <thead>
                       <tr>
                         <th>RECORD ID</th>
                         <th>TOOL ID</th>
                         {/* <th>TOOL NAME</th> */}
                         <th>EMPLOYEE ID</th> 
                         {/* <th>EMPLOYEE</th> */}
                         <th>STORE EMPLOYEE ID</th>
                         {/* <th>STORE EMPLOYEE</th> */}
                         <th>DATE TAKEN</th>
                         <th>DATE RETURNED</th>
                         <th>UPDATE DATE RETURNED</th>
                         <th>DELETE RECORD </th>
                       </tr>
                   </thead>

                   <tbody>
                       {filteredToolRecords.map((toolrecord) =>(
                        <tr key={toolrecord.id  || Math.random().toString()}>
                            <td>{toolrecord.id}</td>
                            <td>{toolrecord.tool_id}</td>
                            {/* <td>{toolrecord.tool}</td> */}
                            <td>{toolrecord.employee_id}</td>
                            {/* <td>{toolrecord.employee}</td> */}
                            <td>{toolrecord.store_employee_id}</td>
                            {/* <td>{toolrecord.store_employee}</td> */}
                            <td>{toolrecord.date_taken}</td>
                            <td>{toolrecord.date_returned || "N/A"}</td>
                            <td>  <button onClick={() => handleDateReturnedUpdate(toolrecord.id)}>UPDATE</button> </td>
                            <td>
                                <button onClick={() => {
                                                setSelectedToolRecordId(toolrecord.id)
                                                setIsModalOpen(true)
                                    }}>DELETE
                                </button>
                            </td>
                        </tr>
                       ))}
                   </tbody>
               </table>
           </div>

           <ToolRecordsDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleRecordDelete}

           />
        </>
    )
}
export default ToolRecords