import Home from "./Pages/Home";
import Tools from "./Pages/Tools";
import ErrorPage from "./Pages/ErrorPage";
import AddTool from "./Pages/AddTool";
import ToolRecords from "./Pages/ToolRecords";
import App from "./App"


const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "/",
            element: <Home />
        }, 
        {
            path: "/add_tools",
            element: <AddTool />
        },
        {
            path: "/tools",
            element: <Tools />
        },
        {
            path: "/toolrecords",
            element: <ToolRecords/>
        }
      
    ]
 }
  
];

export default routes;