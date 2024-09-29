import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

import { coverPic } from "../data/data";
import styles from "./login.module.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    shareData: false,
    categories: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.shareData) {
        console.log("Login successful");
        saveUser(formData);
        navigate("/categories");
      }
    } catch (err) {}
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/categories");
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img className={styles.coverImage} src={coverPic} />
        <div className={styles.imageOverlay}>
          <h1>Discover new things on Superapp</h1>
        </div>
      </div>
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formTop}>
            <h2 className="appName">Super app</h2>
            <p className={styles.formTitle}>Create your new account</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="UserName"
              required
              className={styles.input}
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="number"
              id="mobile"
              name="mobile"
              placeholder="Mobile"
              required
              className={styles.input}
              value={formData.mobile}
              onChange={handleChange}
            />

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="shareData"
                checked={formData.shareData}
                onChange={handleChange}
              />
              Share my registration data with Superapp
            </label>

            <button type="submit" className={styles.submitButton}>
              SIGN UP
            </button>
          </form>
          <p className={styles.termsText}>
            By clicking on Sign up, you agree to Superapp,{" "}
            <a href="#">Terms and Conditions of Use</a>
          </p>
          <p className={styles.privacyText}>
            To learn more about how Superapp collects, uses, shares and protects
            your personal data please head to Superapp{" "}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
