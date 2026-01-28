import { useEffect, useState, useCallback } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/API';
import moment from 'moment';
import { ProgressBar } from 'react-loader-spinner';

const Hospital = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getHospitals = useCallback(async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getHospitals();
  }, [getHospitals]);

  return (
    <Layout>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fa-solid fa-hospital" style={{ marginRight: '12px', color: '#c41e3a' }}></i>
            Hospitals List
          </h1>
          <span className="badge bg-danger" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Total: {data?.length || 0} Hospitals
          </span>
        </div>

        {loading ? (
          <div className="loading-container">
            <ProgressBar
              visible={true}
              height="150"
              width="150"
              color="#c41e3a"
              ariaLabel="progress-bar-loading"
            />
          </div>
        ) : (
          <div className="content-card">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Hospital Name</th>
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
                              background: 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '12px',
                              color: 'white',
                              fontWeight: '600'
                            }}>
                              <i className="fa-solid fa-hospital"></i>
                            </div>
                            <strong>{record.hospitalName}</strong>
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
                        <i className="fa-solid fa-hospital" style={{ fontSize: '48px', color: '#ddd', marginBottom: '15px', display: 'block' }}></i>
                        <p style={{ color: '#999', fontSize: '16px' }}>No hospitals found</p>
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

export default Hospital;
