import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);

  const statsCards = [
    {
      title: "Donors",
      icon: "fa-users",
      color: "success",
      link: "/donar-list",
      description: "Manage registered blood donors"
    },
    {
      title: "Hospitals",
      icon: "fa-hospital",
      color: "danger",
      link: "/hospital-list",
      description: "View and manage hospitals"
    },
    {
      title: "Organisations",
      icon: "fa-building",
      color: "warning",
      link: "/org-list",
      description: "Blood bank organisations"
    }
  ];

  return (
    <Layout>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fa-solid fa-gauge-high" style={{ marginRight: '12px', color: '#667eea' }}></i>
            Admin Dashboard
          </h1>
          <span className="badge-role badge-admin">
            <i className="fa-solid fa-shield-halved" style={{ marginRight: '6px' }}></i>
            Administrator
          </span>
        </div>

        <div className="content-card mb-4">
          <div className="d-flex align-items-center mb-4">
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
              color: 'white',
              fontSize: '24px'
            }}>
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <div>
              <h2 style={{ margin: 0, color: '#333' }}>Welcome, {user?.name}</h2>
              <p style={{ margin: 0, color: '#666' }}>Manage your Blood Bank System</p>
            </div>
          </div>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            As an administrator, you have full access to manage donors, hospitals, and organisations
            in the Blood Bank Management System. Use the sidebar navigation or the quick access cards
            below to manage different aspects of the system.
          </p>
        </div>

        <div className="row g-4">
          {statsCards.map((card, index) => (
            <div key={index} className="col-md-4">
              <div className={`stats-card ${card.color}`} style={{ cursor: 'pointer' }}
                onClick={() => window.location.href = card.link}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <i className={`fa-solid ${card.icon}`} style={{ fontSize: '32px', opacity: 0.9 }}></i>
                  <i className="fa-solid fa-arrow-right" style={{ opacity: 0.6 }}></i>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '15px 0 10px' }}>{card.title}</h3>
                <p style={{ opacity: 0.8, margin: 0, fontSize: '14px' }}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="content-card mt-4">
          <h4 style={{ marginBottom: '20px' }}>
            <i className="fa-solid fa-circle-info" style={{ marginRight: '10px', color: '#667eea' }}></i>
            Quick Tips
          </h4>
          <ul style={{ color: '#666', lineHeight: '2' }}>
            <li>Use <strong>Donor List</strong> to view and manage all registered blood donors</li>
            <li>Use <strong>Hospital List</strong> to manage hospitals in the system</li>
            <li>Use <strong>Organisation List</strong> to manage blood bank organisations</li>
            <li>You can delete records that are no longer needed from each list</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
