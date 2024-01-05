import { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import states from "../states";

export default function Form() {
  const [maxTuition, setMaxTuition] = useState("");
  const [stateName, setStateName] = useState("");
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(null);
  const allStates = states;

  // create array for Favorites list from selected colleges
  // function handleSelect(id) {
  //   console.log(id);
  // }

  const baseUrl = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${process.env.REACT_APP_API_KEY}&per_page=100`;
  const fields = "&fields=school.name,latest.cost.tuition.in_state";
  const stateParam = !!stateName ? `&school.state=${stateName}` : "";
  const tuitionParam = maxTuition
    ? `&latest.cost.tuition.in_state__range=1..${maxTuition}`
    : "";
  const apiCall = baseUrl + fields + tuitionParam + stateParam;

  console.log(apiCall);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          axios.get(apiCall).then((res) => {
            setResults(res.data["results"]);
            setCount(res.data["metadata"].total);
          });
        }}
      >
        <div className="form-group">
          <label htmlFor="maxTuition">Maximum Tuition</label>
          <input
            type="maxTuition"
            className="form-control"
            id=""
            aria-describedby="college-name"
            placeholder="Enter maximum tuition amount"
            value={maxTuition}
            onChange={(e) => setMaxTuition(e.target.value)}
          />
          <label htmlFor="selectState">State</label>
          <select
            value={stateName}
            className="form-select"
            onChange={(e) => setStateName(e.target.value)}
          >
            {allStates.map((us) => (
              <option value={us} key={us}>
                {us}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {count && (
        <div>
          <p>Max Tuition: {maxTuition}</p>
          <p>Selected State: {stateName}</p>
          <p>Count: {count}</p>
        </div>
      )}

      <ul>
        {results.map((college) => (
          <li key={college.id}>
            {college["school.name"]} - {college["latest.cost.tuition.in_state"]}
          </li>
        ))}
      </ul>
    </>
  );
}
