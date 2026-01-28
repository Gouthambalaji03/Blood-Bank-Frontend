import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import InputType from "./InputType";
import { userLogin, userRegister } from "../../../redux/features/auth/authActions";
import toast from "react-hot-toast";

const Form = ({ formType, submitBtn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const roles = [
    { id: "donar", label: "Donor", icon: "fa-hand-holding-heart" },
    { id: "admin", label: "Admin", icon: "fa-user-shield" },
    { id: "hospital", label: "Hospital", icon: "fa-hospital" },
    { id: "organisation", label: "Organisation", icon: "fa-building" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formType === "login") {
      if (!email || !password || !role) {
        return toast.error("Please provide all fields");
      }

      const result = await dispatch(userLogin({ email, password, role }));
      if (result.payload?.success) {
        navigate("/home");
      }
    } else if (formType === "register") {
      if (!email || !password || !role) {
        return toast.error("Please provide email, password and role");
      }
      if ((role === "donar" || role === "admin") && !name) {
        return toast.error("Please provide your name");
      }
      if (role === "hospital" && !hospitalName) {
        return toast.error("Please provide hospital name");
      }
      if (role === "organisation" && !organisationName) {
        return toast.error("Please provide organisation name");
      }

      const result = await dispatch(userRegister({
        name,
        role,
        email,
        password,
        organisationName,
        hospitalName,
        website,
        address,
        phone,
      }));

      if (result.payload?.success) {
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="role-selector">
          {roles.map((r) => (
            <div key={r.id} className="role-option">
              <input
                type="radio"
                id={`${r.id}Radio`}
                name="role"
                value={r.id}
                checked={role === r.id}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor={`${r.id}Radio`}>
                <i className={`fa-solid ${r.icon}`} style={{ marginRight: '8px' }}></i>
                {r.label}
              </label>
            </div>
          ))}
        </div>

        {formType === "login" ? (
          <>
            <InputType
              labelText={"Email Address"}
              lableForm={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <InputType
              labelText={"Password"}
              lableForm={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </>
        ) : (
          <>
            {(role === "donar" || role === "admin") && (
              <InputType
                labelText={"Full Name"}
                lableForm={"forName"}
                inputType={"text"}
                name={"name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            )}
            {role === "hospital" && (
              <InputType
                labelText={"Hospital Name"}
                lableForm={"forHospitalName"}
                inputType={"text"}
                name={"hospitalName"}
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="Enter hospital name"
              />
            )}
            {role === "organisation" && (
              <InputType
                labelText={"Organisation Name"}
                lableForm={"forOrganisationName"}
                inputType={"text"}
                name={"organisationName"}
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                placeholder="Enter organisation name"
              />
            )}
            <InputType
              labelText={"Email Address"}
              lableForm={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <InputType
              labelText={"Password"}
              lableForm={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 characters)"
            />
            <InputType
              labelText={"Phone Number"}
              lableForm={"forPhone"}
              inputType={"tel"}
              name={"phone"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
            <InputType
              labelText={"Address"}
              lableForm={"forAddress"}
              inputType={"text"}
              name={"address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required={false}
            />
            <InputType
              labelText={"Website"}
              lableForm={"forWebsite"}
              inputType={"url"}
              name={"website"}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              required={false}
            />
          </>
        )}

        <button className="btn-primary-custom" type="submit" disabled={loading}>
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
              Please wait...
            </>
          ) : (
            <>
              <i className={`fa-solid ${formType === 'login' ? 'fa-right-to-bracket' : 'fa-user-plus'}`} style={{ marginRight: '10px' }}></i>
              {submitBtn}
            </>
          )}
        </button>

        <div className="text-center mt-4">
          {formType === "login" ? (
            <p style={{ color: '#757575', margin: 0 }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: '#e63946', fontWeight: '600', textDecoration: 'none' }}>
                Register here
              </Link>
            </p>
          ) : (
            <p style={{ color: '#757575', margin: 0 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: '#e63946', fontWeight: '600', textDecoration: 'none' }}>
                Sign in
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
