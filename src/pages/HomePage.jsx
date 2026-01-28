import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from 'moment';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { loading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getBloodRecords = useCallback(async () => {
    try {
      setFetchLoading(true);
      const { data } = await API.get('/inventory/get-inventory');
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log("Error fetching inventory:", error);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    // Wait for user data to load
    if (!user) return;

    // Redirect based on role
    if (user.role === 'admin') {
      navigate('/admin');
      return;
    }

    if (user.role === 'donar') {
      navigate('/organisation');
      return;
    }

    if (user.role === 'hospital') {
      navigate('/organisation');
      return;
    }

    // Only organisations should fetch inventory
    if (user.role === 'organisation') {
      getBloodRecords();
    }
  }, [user, navigate, getBloodRecords]);

  // Show loading while user data is being fetched
  if (loading || !user) {
    return (
      <Layout>
        <div className="loading-container">
          <ProgressBar
            visible={true}
            height="150"
            width="150"
            color="#e63946"
            ariaLabel="progress-bar-loading"
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fa-solid fa-warehouse" style={{ marginRight: '12px', color: '#e63946' }}></i>
            Blood Inventory
          </h1>
          <button
            className="add-inventory-btn"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <i className="fa-solid fa-plus"></i>
            Add Inventory
          </button>
        </div>

        <div className="content-card">
          {fetchLoading ? (
            <div className="text-center py-5">
              <ProgressBar
                visible={true}
                height="80"
                width="80"
                color="#e63946"
                ariaLabel="progress-bar-loading"
              />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donor Email</th>
                    <th scope="col">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    data.map((record) => (
                      <tr
                        className={record.inventoryType.toLowerCase() === 'in' ? 'table-success' : 'table-danger'}
                        key={record._id}
                      >
                        <td>
                          <span style={{
                            fontWeight: '700',
                            fontSize: '16px',
                            color: record.inventoryType.toLowerCase() === 'in' ? '#10b981' : '#ef4444'
                          }}>
                            {record.bloodGroup}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${record.inventoryType.toLowerCase() === 'in' ? 'bg-success' : 'bg-danger'}`}
                            style={{ padding: '8px 16px', fontSize: '12px' }}>
                            {record.inventoryType.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <strong>{record.quantity}</strong> ml
                        </td>
                        <td>{record.email}</td>
                        <td>
                          <i className="fa-regular fa-clock" style={{ marginRight: '8px', color: '#666' }}></i>
                          {moment(record.createdAt).format("DD MMM YYYY, hh:mm A")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        <i className="fa-solid fa-droplet" style={{ fontSize: '48px', color: '#ddd', marginBottom: '15px', display: 'block' }}></i>
                        <p style={{ color: '#999', fontSize: '16px' }}>No inventory records found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Modal />
      </div>
    </Layout>
  );
};

export default HomePage;
