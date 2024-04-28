import React, { useState } from "react";
import styles from "./SignUp.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3333/api/v1/users/signUp", formData)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setFormData({
            email: "",
            firstName: "",
            lastName: "",
            password: "",
          });
        }
      })
      .catch((Err: any) => {
        console.error(Err);
      });
  };

  const handleNavigate = () => {
    navigate("/sigIn");
  };

  return (
    <div className={styles["signup-container"]}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p>
          Already User?{" "}
          <span className={styles.signIn} onClick={handleNavigate}>
            Sign In
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
