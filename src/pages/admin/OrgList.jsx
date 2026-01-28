import { useEffect, useState, useCallback } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { ProgressBar } from "react-loader-spinner";
import toast from "react-hot-toast";

const OrgList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrgs = useCallback(async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getOrgs();
  }, [getOrgs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this organisation?")) return;
    try {
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      toast.success(data?.message || "Organisation deleted successfully");
      getOrgs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete organisation");
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fa-solid fa-building" style={{ marginRight: '12px', color: '#f2994a' }}></i>
            Organisation List
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
                    <th scope="col">Organisation Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Registered On</th>
                    <th scope="col">Action</th>
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
                              color: 'white'
                            }}>
                              <i className="fa-solid fa-building"></i>
                            </div>
                            <strong>{record.organisationName}</strong>
                          </div>
                        </td>
                        <td>{record.email}</td>
                        <td>{record.phone || 'N/A'}</td>
                        <td>{moment(record.createdAt).format("DD MMM YYYY, hh:mm A")}</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(record._id)}
                          >
                            <i className="fa-solid fa-trash" style={{ marginRight: '6px' }}></i>
                            Delete
                          </button>
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

export default OrgList;
