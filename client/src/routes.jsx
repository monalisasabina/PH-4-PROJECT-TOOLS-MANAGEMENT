import Home from "./Pages/Home";
import Tools from "./Pages/Tools";
import ErrorPage from "./Pages/ErrorPage";
import AddTool from "./Pages/AddTool";
import ToolRecords from "./Pages/ToolRecords";
import StoreEmployees from "./Pages/StoreEmployee";
import Employees from "./Pages/Employees";
import App from "./App";
import Login from "./Pages/Login"; 

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
        element: <ToolRecords />
      },
      {
        path: "/storeemployees",
        element: <StoreEmployees />
      },
      {
        path: "/employees",
        element: <Employees />
      },
      {
        path: "/login", 
        element: <Login setIsLoggedIn={() => {}} /> // Pass setIsLoggedIn when logging in
      }
    ]
  }
];

export default routes;
