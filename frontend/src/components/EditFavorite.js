import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CollegeDataService from "../services/CollegeService";
const userId = 54;

export default function EditFavorite({ collegeId }) {
  // Data passed over from React-Router (exists on location)
  // Data contains {name, appStatus, notes}
  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();

  // State variables for EditFavorite component
  const [collegeName, setCollegeName] = useState(data.name);
  const [appStatus, setAppStatus] = useState(data.appStatus);
  const [notes, setNotes] = useState(data.notes);

  function handleDelete() {
    CollegeDataService.remove(userId, collegeId).then((res) => {
      console.log(res);
      navigate("/favorites"); // Redirect to new page
    });
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // axios call to write to MySQL database table
          const dataForDb = { appStatus: appStatus, notes: notes };
          CollegeDataService.update(userId, collegeId, dataForDb).then(
            (res) => {
              navigate("/favorites"); // Redirect to new page
            }
            //SHOULD PROBABLY CONSIDER HANDLING ERROR CONDITION?
          );
        }}
      >
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Disabled input"
            aria-label="Disabled input example"
            disabled
            value={data.name}
          ></input>

          <label htmlFor="appStatus">Application Status</label>
          <select
            value={appStatus}
            className="form-select"
            onChange={(e) => setAppStatus(e.target.value)}
          >
            <option value={0} key={0}>
              Researching
            </option>
            <option value={1} key={1}>
              Applied
            </option>
            <option value={2} key={2}>
              Rejected
            </option>
            <option value={3} key={3}>
              Accepted
            </option>
          </select>
          <label htmlFor="notes">Notes</label>
          <textarea
            className="form-control"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value === "" ? null : e.target.value)
            }
          >
            {notes}
          </textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete()}
          >
            Delete Favorite College
          </button>
        </div>
      </form>
    </>
  );
}
