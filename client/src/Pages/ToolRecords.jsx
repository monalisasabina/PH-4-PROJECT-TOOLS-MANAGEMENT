import { useState,useEffect } from "react"
import RecordsForm from "../components/RecordsForm"
import './Table.css'
import { Link } from "react-router-dom"

function ToolRecords(){

    const[toolRecords, setToolRecords]=useState([])
    const[search, setSearch] =useState("")

    useEffect(()=>{
        fetch('http://127.0.0.1:5555/records')
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
    function handleRecordDelete(id){

        console.log("Deleting record with ID:", id)
     
        //delete warning and putting a password
        if(window.confirm("Only the store manager can delete this tool")){
          const password=window.prompt("Please enter your password")
      
 
        if(password==='123'){
          fetch(`http://127.0.0.1:5555/records/${id}`,{
             method: "DELETE",
           })
          .then((res) => res.json())
          .then(() => setToolRecords(toolRecords.filter(record => record.id !== id)))
          .catch((error) => console.error("Error deleting Tool record",error))
 
          }else{
         alert('Incorrect password')
        }
       }  
     }


    //  search filter
    const filteredToolRecords =toolRecords.filter((record) =>

        record.employee_id.toString().includes(search)
    
    )
 
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
                         <th>DELETE</th>
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
                            <td><button onClick={() =>handleRecordDelete(toolrecord.id)}>DELETE</button></td>
                        </tr>
                       ))}
                   </tbody>
               </table>
           </div>
        </>
    )
}
export default ToolRecords