import { useEffect, useState, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-loader-spinner";

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getConsumers = useCallback(async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    setLoading(true);
    getConsumers();
  }, [getConsumers]);

  return (
    <Layout>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fa-solid fa-users-between-lines" style={{ marginRight: '12px', color: '#667eea' }}></i>
            Consumer Records
          </h1>
          <span className="badge" style={{
            padding: '10px 20px',
            fontSize: '14px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            Total: {data?.length || 0} Records
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
                    <th scope="col">Blood Group</th>
                    <th scope="col">Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    data.map((record) => (
                      <tr key={record._id} className="table-danger">
                        <td>
                          <span style={{ fontWeight: '700', fontSize: '16px', color: '#dc3545' }}>
                            {record.bloodGroup}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-danger" style={{ padding: '8px 16px' }}>
                            <i className="fa-solid fa-arrow-up" style={{ marginRight: '6px' }}></i>
                            {record.inventoryType.toUpperCase()}
                          </span>
                        </td>
                        <td><strong>{record.quantity}</strong> ml</td>
                        <td>
                          <i className="fa-regular fa-envelope" style={{ marginRight: '8px', color: '#666' }}></i>
                          {record.email}
                        </td>
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
                        <p style={{ color: '#999', fontSize: '16px' }}>No consumer records found</p>
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

export default Consumer;
