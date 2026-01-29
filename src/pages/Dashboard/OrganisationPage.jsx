import { useEffect, useState, useCallback } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";
import { ProgressBar } from "react-loader-spinner";

const OrganisationPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrg = useCallback(async () => {
    try {
      if (user?.role === 'donar') {
        const { data } = await API.get("/inventory/get-organisation");
        if (data?.success) {
          setData(data?.organisations);
        }
      }

      if (user?.role === "hospital") {
        const { data } = await API.get("/inventory/get-organisation-for-hospital");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user?.role]);

  useEffect(() => {
    setLoading(true);
    getOrg();
  }, [getOrg]);

  return (
    <Layout>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fa-solid fa-building" style={{ marginRight: '12px', color: '#f2994a' }}></i>
            Organisations
          </h1>
          <span className="badge" style={{
            padding: '10px 20px',
            fontSize: '14px',
            background: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
            color: '#333'
          }}>
            Total: {data?.length || 0} Organisations
          </span>
        </div>

        {loading ? (
          <div className="loading-container">
            <ProgressBar
              visible={true}
              height="150"
              width="150"
              color="#e63946"
              ariaLabel="progress-bar-loading"
            />
          </div>
        ) : (
          <div className="content-card">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Organisation Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    data.map((record) => (
                      <tr key={record._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '12px',
                              color: 'white',
                              fontWeight: '600'
                            }}>
                              <i className="fa-solid fa-building"></i>
                            </div>
                            <strong>{record.organisationName}</strong>
                          </div>
                        </td>
                        <td>
                          <i className="fa-regular fa-envelope" style={{ marginRight: '8px', color: '#666' }}></i>
                          {record.email}
                        </td>
                        <td>
                          <i className="fa-solid fa-phone" style={{ marginRight: '8px', color: '#666' }}></i>
                          {record.phone || 'N/A'}
                        </td>
                        <td>
                          <i className="fa-solid fa-location-dot" style={{ marginRight: '8px', color: '#666' }}></i>
                          {record.address || 'N/A'}
                        </td>
                        <td>
                          <i className="fa-regular fa-calendar" style={{ marginRight: '8px', color: '#666' }}></i>
                          {moment(record.createdAt).format("DD MMM YYYY, hh:mm A")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        <i className="fa-solid fa-building" style={{ fontSize: '48px', color: '#ddd', marginBottom: '15px', display: 'block' }}></i>
                        <p style={{ color: '#999', fontSize: '16px' }}>No organisations found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrganisationPage;
