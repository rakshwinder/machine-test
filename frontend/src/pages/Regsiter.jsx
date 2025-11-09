import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/constant";
import "../style/auth.css";
function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/auth/register`, form);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={`auth-input ${errors.name ? "error" : ""}`}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`auth-input ${errors.email ? "error" : ""}`}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className={`auth-input ${errors.phone ? "error" : ""}`}
          />
          {errors.phone && <div className="error-text">{errors.phone}</div>}

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`auth-input ${errors.password ? "error" : ""}`}
          />
          {errors.password && <div className="error-text">{errors.password}</div>}

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
            <p className="auth-footer">
          Already have an account? <a href="/">LogIn</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
