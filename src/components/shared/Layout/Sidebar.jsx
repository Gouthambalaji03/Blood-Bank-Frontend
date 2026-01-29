import { Link, useLocation } from "react-router-dom";
import "../../../styles/Layout.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const MenuItem = ({ to, icon, label, isActive }) => (
    <div className={`menu-item ${isActive ? "active" : ""}`}>
      <Link to={to}>
        <i className={`fa-solid ${icon}`}></i>
        {label}
      </Link>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h3>
          <i className="fa-solid fa-droplet" style={{ color: '#e63946', marginRight: '10px' }}></i>
          Blood<span className="gold">Bank</span>
        </h3>
        <span>Management System</span>
      </div>

      <div className="menu">
        {user?.role === "organisation" && (
          <>
            <MenuItem
              to="/home"
              icon="fa-cubes"
              label="Inventory"
              isActive={location.pathname === "/home"}
            />
            <MenuItem
              to="/donar"
              icon="fa-hand-holding-medical"
              label="Donors"
              isActive={location.pathname === "/donar"}
            />
            <MenuItem
              to="/hospital"
              icon="fa-hospital"
              label="Hospitals"
              isActive={location.pathname === "/hospital"}
            />
          </>
        )}

        {user?.role === "admin" && (
          <>
            <MenuItem
              to="/donar-list"
              icon="fa-users"
              label="Donor List"
              isActive={location.pathname === "/donar-list"}
            />
            <MenuItem
              to="/hospital-list"
              icon="fa-hospital"
              label="Hospital List"
              isActive={location.pathname === "/hospital-list"}
            />
            <MenuItem
              to="/org-list"
              icon="fa-building"
              label="Organisation List"
              isActive={location.pathname === "/org-list"}
            />
          </>
        )}

        {(user?.role === "donar" || user?.role === "hospital") && (
          <MenuItem
            to="/organisation"
            icon="fa-building-ngo"
            label="Organisations"
            isActive={location.pathname === "/organisation"}
          />
        )}

        {user?.role === "hospital" && (
          <MenuItem
            to="/consumer"
            icon="fa-users-between-lines"
            label="Consumer"
            isActive={location.pathname === "/consumer"}
          />
        )}

        {user?.role === "donar" && (
          <>
            <MenuItem
              to="/add-donation"
              icon="fa-plus-circle"
              label="Add Donation"
              isActive={location.pathname === "/add-donation"}
            />
            <MenuItem
              to="/donation"
              icon="fa-book-medical"
              label="Donations Log"
              isActive={location.pathname === "/donation"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
