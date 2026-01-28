import { useEffect, useState, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  const bloodGroupColors = {
    'O+': { bg: 'linear-gradient(135deg, #FF6B6B 0%, #ee5a5a 100%)', shadow: 'rgba(255, 107, 107, 0.4)' },
    'O-': { bg: 'linear-gradient(135deg, #4ECDC4 0%, #44a08d 100%)', shadow: 'rgba(78, 205, 196, 0.4)' },
    'A+': { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', shadow: 'rgba(102, 126, 234, 0.4)' },
    'A-': { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', shadow: 'rgba(240, 147, 251, 0.4)' },
    'B+': { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadow: 'rgba(79, 172, 254, 0.4)' },
    'B-': { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', shadow: 'rgba(67, 233, 123, 0.4)' },
    'AB+': { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', shadow: 'rgba(250, 112, 154, 0.4)' },
    'AB-': { bg: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', shadow: 'rgba(161, 140, 209, 0.4)' },
  };

  const getBloodRecords = useCallback(async () => {
    try {
      const { data } = await API.get('/inventory/get-recent-inventory');
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getBloodGroupData = useCallback(async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBloodRecords();
  }, [getBloodRecords]);

  useEffect(() => {
    getBloodGroupData();
  }, [getBloodGroupData]);

  return (
    <Layout>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fa-solid fa-chart-pie" style={{ marginRight: '12px', color: '#c41e3a' }}></i>
            Blood Analytics
          </h1>
        </div>

        <div className="row g-4 mb-4">
          {data.map((record) => (
            <div key={record.bloodGroup} className="col-lg-3 col-md-4 col-sm-6">
              <div
                className="blood-card"
                style={{
                  background: bloodGroupColors[record.bloodGroup]?.bg || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: `0 10px 30px ${bloodGroupColors[record.bloodGroup]?.shadow || 'rgba(0,0,0,0.2)'}`,
                }}
              >
                <div className="card-body text-white text-center">
                  <h2 className="card-title" style={{ fontSize: '48px', fontWeight: '800', marginBottom: '15px' }}>
                    {record.bloodGroup}
                  </h2>
                  <div className="d-flex justify-content-between mb-2">
                    <span><i className="fa-solid fa-arrow-down"></i> In</span>
                    <strong>{record.totalIn} ml</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span><i className="fa-solid fa-arrow-up"></i> Out</span>
                    <strong>{record.totalOut} ml</strong>
                  </div>
                </div>
                <div className="card-footer" style={{ background: 'rgba(0,0,0,0.2)', border: 'none', textAlign: 'center', padding: '15px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Available</span>
                  <h4 style={{ color: 'white', margin: '5px 0 0', fontWeight: '700' }}>{record.availabeBlood} ml</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="content-card">
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>
            <i className="fa-solid fa-clock-rotate-left" style={{ marginRight: '10px', color: '#c41e3a' }}></i>
            Recent Blood Transactions
          </h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Email</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData?.length > 0 ? (
                  inventoryData.map((record) => (
                    <tr
                      key={record._id}
                      className={record.inventoryType.toLowerCase() === 'in' ? 'table-success' : 'table-danger'}
                    >
                      <td>
                        <strong style={{ fontSize: '16px' }}>{record.bloodGroup}</strong>
                      </td>
                      <td>
                        <span className={`badge ${record.inventoryType.toLowerCase() === 'in' ? 'bg-success' : 'bg-danger'}`}>
                          {record.inventoryType.toUpperCase()}
                        </span>
                      </td>
                      <td><strong>{record.quantity}</strong> ml</td>
                      <td>{record.email}</td>
                      <td>
                        <i className="fa-regular fa-clock" style={{ marginRight: '6px', color: '#666' }}></i>
                        {moment(record.createdAt).format("DD MMM YYYY, hh:mm A")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <p style={{ color: '#999' }}>No recent transactions</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
