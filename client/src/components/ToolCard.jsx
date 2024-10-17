import "../Pages/tools.css";

function ToolCard({
  name,
  image,
  totalNumber,
  availableTools,
  brand,
  purchaseDate,
}) {
  return (
    <div className="tool_card">
      <img src={image} className="tool_card-img" />
      <h3 className="tool_card-title"> {name}</h3>
      <div className="tool_card-content">
        <p>Brand:{brand}</p>
        <p>Total Number:{totalNumber}</p>
        <p>Available Tools:{availableTools}</p>
        <p>Purchase Date: {purchaseDate}</p>
        <div className="tool_card-btns">
          <div className="tool_card-btn minus">-</div>
          <div className="tool_card-btn plus">+</div>
        </div>
      </div>
    </div>
  );
}

export default ToolCard;
