import moment from "moment";
import { useEffect, useState, useCallback } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-loader-spinner";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDonations = useCallback(async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
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
    getDonations();
  }, [getDonations]);

  return (
    <Layout>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fa-solid fa-book-medical" style={{ marginRight: '12px', color: '#10b981' }}></i>
            Your Donations
          </h1>
          <span className="badge bg-success" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Total: {data?.length || 0} Donations
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
                    <th scope="col">Blood Group</th>
                    <th scope="col">Donated To</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    data.map((record) => (
                      <tr key={record._id} className="table-success">
                        <td>
                          <span style={{ fontWeight: '700', fontSize: '16px', color: '#10b981' }}>
                            {record.bloodGroup}
                          </span>
                        </td>
                        <td>
                          <i className="fa-solid fa-building" style={{ marginRight: '8px', color: '#666' }}></i>
                          {record.organisation?.email || 'N/A'}
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
                        <i className="fa-solid fa-heart" style={{ fontSize: '48px', color: '#ddd', marginBottom: '15px', display: 'block' }}></i>
                        <p style={{ color: '#999', fontSize: '16px' }}>No donations yet</p>
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

export default Donation;
