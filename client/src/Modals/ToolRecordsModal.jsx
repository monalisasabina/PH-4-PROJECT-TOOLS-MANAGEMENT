import { useState } from "react"
import "./Modal.css"

function ToolRecordsDeleteModal({isOpen, onClose, onConfirm}){

    const[password, setPassword] = useState("")

    function handleSubmit(){
        onConfirm(password)
        setPassword('')
    }

    if(!isOpen) return null

    return(
        <div className="modal-overlay">

            <div className="modal">
                <h2>Confirm Deletion</h2>
                <p>Only the store manger can delete this tool record. Please enter your password:</p>
                <input
                     type="password"
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                     placeholder="Enter password"
                />

                <div className="modal_actions" >
                    <button onClick={handleSubmit} >Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>

            </div>

        </div>
    )
}

export default ToolRecordsDeleteModal