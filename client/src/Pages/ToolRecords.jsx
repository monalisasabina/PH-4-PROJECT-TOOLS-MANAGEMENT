import { useState,useEffect } from "react"
function ToolRecords(){

    const[toolRecords, setToolRecords]=useState([])

    useEffect(()=>{
        fetch('http://127.0.0.1:5555/records')
        .then((res) => res.json())
        .then((toolRecordsData) => {
                              console.log(toolRecordsData)
                              setToolRecords(toolRecordsData)
                            })
        .catch((error) => console.error('Error fetching tools',error))                    


    },[])

    return(
        <>
           <h1> Tool Records</h1>

           <div>
               <table>
                   <thead>
                       <tr>
                         <th>ID</th>
                         <th>TOOL NAME</th>
                         <th>EMPLOYEE</th>
                         <th>STORE EMPLOYEE</th>
                         <th>DATE TAKEN</th>
                         <th>DATE RETURNED</th>
                       </tr>
                   </thead>

                   <tbody>
                       {toolRecords.map((toolrecord) =>(

                        <tr key={toolrecord.id}>
                            <td>{toolrecord.id}</td>
                            <td>{toolrecord.tool}</td>
                            <td>{toolrecord.employee}</td>
                            <td>{toolrecord.store_employee}</td>
                            <td>{toolrecord.date_taken}</td>
                            <td>{toolrecord.date_returned}</td>

                        </tr>



                       ))}
                     

                   </tbody>
               </table>


           </div>
        
        </>
    )
}
export default ToolRecords