import { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";
import toast from "react-hot-toast";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return toast.error("Please provide all fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        toast.success("New record created successfully!");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              <i className="fa-solid fa-droplet" style={{ marginRight: '10px' }}></i>
              Add Blood Record
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-4">
              <label className="form-label fw-semibold mb-3">Inventory Type</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input
                    type="radio"
                    name="inventoryType"
                    id="typeIn"
                    value="in"
                    checked={inventoryType === "in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="typeIn" className="form-check-label">
                    <span className="badge bg-success" style={{ padding: '8px 16px' }}>
                      <i className="fa-solid fa-arrow-down" style={{ marginRight: '6px' }}></i>
                      IN (Donation)
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="inventoryType"
                    id="typeOut"
                    value="out"
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="typeOut" className="form-check-label">
                    <span className="badge bg-danger" style={{ padding: '8px 16px' }}>
                      <i className="fa-solid fa-arrow-up" style={{ marginRight: '6px' }}></i>
                      OUT (Usage)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Blood Group</label>
              <select
                className="form-select"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <InputType
              labelText="Donor/Recipient Email"
              lableForm="email"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />

            <InputType
              labelText="Quantity (ML)"
              lableForm="quantity"
              inputType="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity in ml"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleModalSubmit}
            >
              <i className="fa-solid fa-plus" style={{ marginRight: '8px' }}></i>
              Add Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
