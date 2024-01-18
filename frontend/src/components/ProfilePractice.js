// import React from "react";
// import AuthService from "../services/auth.service";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CollegeDataService from "../services/CollegeService";
import UserContext from "../UserContext";

const ProfilePractice = ({ userId }) => {
  // const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  // get user/userid from context
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // State variables for EditFavorite component
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(currentUser.email);

  let tempUser = localStorage.getItem("user");

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // axios call to write to MySQL database table

          const dataForDb = {};

          if (email !== "") {
            dataForDb["email"] = email;
          }
          if (password !== "") {
            dataForDb["password"] = password;
          }
          if (username !== "") {
            dataForDb["username"] = username;
          }

          CollegeDataService.updateUser(currentUser.id, dataForDb)
            .then((res) => {
              let parsedTempUser = JSON.parse(tempUser);
              let newTempUser = {
                email: email,
                username: username,
              };

              let result = { ...parsedTempUser, ...newTempUser };
              let jsonResult = JSON.stringify(result);
              console.log(jsonResult);
              localStorage.setItem("user", jsonResult);
              setCurrentUser(result);
              setPassword("");
              alert("User data updated!");
              // navigate("/account"); // reload page
            })
            .catch((error) => {
              // Handle error condition
              console.error("Error updating user:", error);
              // You might want to provide user feedback on the error
            });
        }}
      >
        <div className="mb-3 mt-3">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <button type="submit" className="mt-3 me-3 btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePractice;
