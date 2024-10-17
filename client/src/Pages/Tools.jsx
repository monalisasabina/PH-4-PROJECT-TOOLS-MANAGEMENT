import ToolCard from "../components/ToolCard";
import { useState, useEffect } from "react";
import "../Pages/tools.css";

function Tools() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/tools")
      .then((res) => res.json())
      .then((toolsData) => {
        console.log(toolsData);
        setTools(toolsData);
      })
      .catch((error) => console.error("Error fetching tools", error));
  }, []);

  return (
    <div>
      <h1>TOOL PAGE</h1>

      <div className="tool_list">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            id={tool.id}
            name={tool.name}
            image={tool.image}
            brand={tool.brand}
            totalNumber={tool.no_of_tools}
            availableTools={tool.available_tools}
            purchaseDate={tool.purchase_date}
          />
        ))}
      </div>
    </div>
  );
}

export default Tools;
