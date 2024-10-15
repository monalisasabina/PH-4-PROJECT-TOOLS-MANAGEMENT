function ToolCard({name, image, totalNumber,availableTools,brand, purchaseDate}){


    return(
        <>
           
           <h3> {name}</h3>
           <img src={image}/>
           <p>Brand:{brand}</p>
           <p>Total Number:{totalNumber}</p>
           <p>Available Tools:{availableTools}</p>
           <p>Purchase Date: {purchaseDate}</p>
        </>
    )
}

export default ToolCard

