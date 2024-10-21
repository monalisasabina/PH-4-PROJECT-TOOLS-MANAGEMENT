import { useState, useEffect } from "react";
import "../Pages/tools.css";

function ToolCard({
  name,
  image,
  totalNumber,
  availableTools,
  brand,
  purchaseDate,
  id,
}) {

  const[availTools, setAvailableTools] = useState(0)
  const storageKey=`availableTools-${id}`


    // Load available tools from localStorage on component mount
    useEffect(() => {
      const storedTools = localStorage.getItem(storageKey);
      if (storedTools !== null) {
        setAvailableTools(Number(storedTools));
      } else {
        setAvailableTools(totalNumber); // Set to total number if nothing in localStorage
      }
    }, [totalNumber, storageKey]);
  
    // Save the available tools count to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem(storageKey, availableTools);
    }, [availTools, storageKey]);


  // handling the available number increase
  function handleClickAdd(){
    if(availTools <totalNumber){
      setAvailableTools(availTools +1)
    }

  }
  // handling the available tool number decrease
  function handleClickReduce(){
    if(availTools >0){
      setAvailableTools(availTools -1)
    }

  }

  return (
    <div className="tool_card">
      <img src={image} className="tool_card-img" />
      <h3 className="tool_card-title"> {name}</h3>
      <div className="tool_card-content">
        <p>Tool id: <strong>{id}</strong> </p>
        <p>Brand: <strong> {brand}</strong></p>
        <p>Total Number: <strong> {totalNumber}</strong> </p>
        <p>Available Tools: <strong> {availTools} </strong> </p>
        <p>Purchase Date:  <strong> {purchaseDate} </strong> </p>

        <div className="tool_card-btns">
          <button onClick={handleClickReduce}  className="tool_card-btn minus">-</button>
          <button  onClick={handleClickAdd} className="tool_card-btn plus">+</button>
        </div>
      </div>
    </div>
  );
}

export default ToolCard;
