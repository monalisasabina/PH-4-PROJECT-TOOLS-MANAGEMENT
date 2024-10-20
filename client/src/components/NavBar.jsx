import { NavLink } from "react-router-dom";

function NavBar({ isLoggedIn, handleLogout }) {
  if (!isLoggedIn) {
    return null; // Do not render the navbar if not logged in
  }

  return (
    <nav className="dark-glow-navbar">
      <NavLink to="/" className="nav_link">Home</NavLink>
      <NavLink to="/add_tools" className="nav_link">Add Tool</NavLink>
      <NavLink to="/tools" className="nav_link">Tools</NavLink>
      <NavLink to="/toolrecords" className="nav_link">Tools Records</NavLink>

      {isLoggedIn && (
        <button onClick={handleLogout} className="Logout">Logout</button>
      )}
    </nav>
  );
}

export default NavBar;
