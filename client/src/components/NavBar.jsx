import {NavLink} from "react-router-dom"
 
function NavBar(){
    return(
        <nav>
            <NavLink to="/" className="nav-link">Home</NavLink>

            <NavLink to="/add_tools" className="nav_link" >Add Tool</NavLink>

            <NavLink to="/tools" className="nav_link" >Tools</NavLink>

            <NavLink to="/toolrecords" className="nav_link" >Tools Records</NavLink>

        </nav>

    );
};

export default NavBar