import { useEffect, useState, useCallback } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import toast from "react-hot-toast";
import { ProgressBar } from "react-loader-spinner";

const AddDonation = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organisationId: "",
    bloodGroup: "",
    quantity: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const getOrganisations = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/inventory/get-all-organisations");
      if (data?.success) {
        setOrganisations(data?.organisations);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load organisations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrganisations();
  }, [getOrganisations]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.organisationId || !formData.bloodGroup || !formData.quantity) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await API.post("/inventory/donor-create-donation", formData);
      if (data?.success) {
        toast.success("Donation recorded successfully!");
        setFormData({
          organisationId: "",
          bloodGroup: "",
          quantity: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to record donation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            <i className="fa-solid fa-plus-circle" style={{ marginRight: '12px', color: '#e63946' }}></i>
            Add Donation
          </h1>
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
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="organisationId" className="form-label" style={{ fontWeight: '600', color: '#333' }}>
                    <i className="fa-solid fa-building" style={{ marginRight: '8px', color: '#666' }}></i>
                    Select Organisation
                  </label>
                  <select
                    id="organisationId"
                    name="organisationId"
                    className="form-select"
                    value={formData.organisationId}
                    onChange={handleChange}
                    style={{
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">-- Select Organisation --</option>
                    {organisations.map((org) => (
                      <option key={org._id} value={org._id}>
                        {org.organisationName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="bloodGroup" className="form-label" style={{ fontWeight: '600', color: '#333' }}>
                    <i className="fa-solid fa-droplet" style={{ marginRight: '8px', color: '#e63946' }}></i>
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    className="form-select"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    style={{
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">-- Select Blood Group --</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="quantity" className="form-label" style={{ fontWeight: '600', color: '#333' }}>
                    <i className="fa-solid fa-flask" style={{ marginRight: '8px', color: '#666' }}></i>
                    Quantity (ml)
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-control"
                    placeholder="Enter quantity in ml"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    style={{
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn"
                    disabled={submitting}
                    style={{
                      background: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)',
                      color: 'white',
                      padding: '12px 30px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '16px',
                      border: 'none',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1
                    }}
                  >
                    {submitting ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-heart" style={{ marginRight: '8px' }}></i>
                        Submit Donation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddDonation;
