import { useState } from "react";
import CollegeDataService from "../services/CollegeService";
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";

export default function AddCollege() {
  const initialCollegeState = {
    app_status: null,
    college_id: null,
    notes: "",
    user_id: null,
  };
  const [college, setCollege] = useState(initialCollegeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollege({ ...college, [name]: value });
  };

  const saveCollege = () => {
    var data = {
      app_status: college.app_status,
      college_id: college.college_id,
      notes: college.notes,
      user_id: college.user_id,
    };
    CollegeDataService.create(data)
      .then((response) => {
        setCollege({
          app_status: response.data.app_status,
          college_id: response.data.college_id,
          notes: response.data.notes,
          user_id: response.data.user_id,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newCollege = () => {
    setCollege(initialCollegeState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCollege}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">App Status</label>
            <input
              type="text"
              className="form-control"
              id="app_status"
              required
              value={college.app_status}
              onChange={handleInputChange}
              name="app_status"
            />
          </div>

          <button onClick={saveCollege} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
