import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: "badge-admin",
      donar: "badge-donar",
      hospital: "badge-hospital",
      organisation: "badge-organisation",
    };
    return badges[role] || "badge-donar";
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fa-solid fa-droplet" style={{ color: '#c41e3a' }}></i>
          Blood<span className="gold">Bank</span>
        </Link>

        <div className="d-flex align-items-center gap-3">
          {user && (
            <>
              <span className={`badge-role ${getRoleBadge(user.role)}`}>
                {user.role}
              </span>
              <span className="nav-link" style={{ cursor: 'default' }}>
                <i className="fa-solid fa-user" style={{ marginRight: '8px' }}></i>
                {user.name || user.hospitalName || user.organisationName}
              </span>
            </>
          )}
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '8px' }}></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
