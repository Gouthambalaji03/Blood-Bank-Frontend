import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";
import toast from "react-hot-toast";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return toast.error("Please provide all fields");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log("Error in login: ", error);
    toast.error("Login failed. Please try again.");
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  organisationName,
  hospitalName,
  website,
  address,
  phone
) => {
  e.preventDefault();
  try {
    // Validate based on role
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

    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        organisationName,
        hospitalName,
        website,
        address,
        phone,
      })
    );
  } catch (error) {
    console.log("Error in Register: ", error);
    toast.error("Registration failed. Please try again.");
  }
};
