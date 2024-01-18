import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext } from "react";

const ContactForm = () => {
  const navigate = useNavigate();

  let [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8080/api/contact/create", formData, {
          onUploadProgress: (progressEvent) => {
            console.log("Upload Progress:", progressEvent);
          },
        })
        .then((response) => {
          navigate("/thankYou");
          setFormData = {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            notes: "",
          };
          // console.log("Response:", response.data);
        });
      // console.log("Contact form sucessfully submitted!");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username (if applicable)
        </label>
        <input
          type="username"
          className="form-control"
          id="username"
          value={formData.username}
          onChange={handleChange}
          // required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea
          className="form-control"
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
