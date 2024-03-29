import { useState, useContext } from "react";
import React from "react";
import states from "../states";
import axios from "axios";
import cip_4_digit from "../cip_4_digit.json";
import CollegeService from "../services/CollegeService";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

// const userId = null;

export default function Form() {
  const navigate = useNavigate();
  const [degreeType, setDegreeType] = useState(0);
  const [stateName, setStateName] = useState("");
  const [maxTuition, setMaxTuition] = useState(0);
  const [schoolSize, setSchoolSize] = useState(0);
  const [results, setResults] = useState([]);
  const [degreeProgramChosen, setDegreeProgramChosen] = useState("");
  const [favorites, setFavorites] = useState([]);
  // get user/userid from context
  const { currentUser } = useContext(UserContext);

  // updated handleCheck to not allow for duplicate entry in favorites list
  const handleCheck = async function(event) {
    let exists = false;
    try {
      // if college exists, then uncheck checkbox and do not add collegeId to state array
      const response = await CollegeService.getOne(
        currentUser.id,
        event.target.value
      );
      exists = true;
      alert("College already exists in Favorites");
      event.target.checked = false;
    } catch (e) {
      var updatedList = [...favorites];
      if (event.target.checked) {
        updatedList = [...favorites, event.target.value];
      } else {
        updatedList.splice(favorites.indexOf(event.target.value), 1);
      }
      setFavorites(updatedList);
    }
    return exists;
  };

  const handleAddFavorites = function() {
    //loop through favorites array use .map() and for each call axios.create
    const data = {
      userId: currentUser.id,
      notes: null,
      appStatus: 0,
      collegeId: null,
    };
    favorites.map((college) => {
      data["collegeId"] = college;
      CollegeService.create(data)
        .then((response) => {
          // console.log(response.data);
        })
        .catch((e) => {
          // console.log(e);
        });
    });
    navigate("/favorites");
  };

  const handleRedirectRegister = function() {
    navigate("/register");
  };

  const degreePrograms = cip_4_digit.sort(function(a, b) {
    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
  });

  const baseUrl = `http://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${process.env.REACT_APP_API_KEY}&per_page=100`;
  const fieldsDefault = `&fields=school.name,latest.cost.tuition.in_state,school.state,latest.student.size,school.city,school.degrees_awarded.highest,id`;
  const stateParam = !stateName == "" ? `&school.state=${stateName}` : "";
  const tuitionParam = maxTuition
    ? `&latest.cost.tuition.in_state__range=1..${maxTuition}`
    : "";
  const degreeParam =
    !degreeType == 0
      ? `&latest.programs.cip_4_digit.credential.level=${degreeType}`
      : "";
  const schoolSizeParam =
    schoolSize == 1
      ? "&latest.student.size__range=1..1999"
      : schoolSize == 2
      ? "&latest.student.size__range=2000..15000"
      : schoolSize == 3
      ? "&latest.student.size__range=15001..100000"
      : "";
  const degreeProgramChosenParam =
    !degreeProgramChosen == ""
      ? `&latest.programs.cip_4_digit.code=${degreeProgramChosen}`
      : "";

  const apiCall =
    baseUrl +
    fieldsDefault +
    tuitionParam +
    stateParam +
    degreeParam +
    schoolSizeParam +
    degreeProgramChosenParam;
  // console.log(apiCall);
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // clear existing checked colleges
          setFavorites([]);
          axios.get(apiCall).then((res) => {
            //call to API and setting results, sending alert if no results are found
            if (res.data["results"].length == 0) {
              alert("There are no results for this search!");
            } else setResults(res.data["results"]);
          });
        }}
      >
        <div className="mb-3">
          <label value={degreeType}>Select a degree:</label>
          <select
            className="form-control"
            onChange={(e) => setDegreeType(e.target.value)}
          >
            <option value="degree level"> -- Select a degree level -- </option>
            <option value="1">Non-degree granting </option>
            <option value="2">Associate Degree </option>
            <option value="3">Bachelor's Degree </option>
          </select>
        </div>

        <div className="mb-3">
          <label value="degreeSelector">Select a degree program:</label>
          <select
            className="form-control"
            onChange={(e) => setDegreeProgramChosen(e.target.value)}
          >
            value= {degreeProgramChosen}
            <option>Select a degree program</option>
            {degreePrograms.map((degree, index) => (
              <option value={degree.code} key={index}>
                {degreePrograms[index].title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label value="inputState">Select a state:</label>
          <select
            className="form-control"
            onChange={(e) => setStateName(e.target.value)}
          >
            value= {stateName}
            <option>Select a state</option>
            {states.map((state, index) => (
              <option value={state} key={index}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label value={maxTuition}>Tuition maximum:</label>
          <input
            type="text"
            className="form-control"
            id=""
            placeholder="Enter maximum tuition"
            onChange={(e) => setMaxTuition(e.target.value)}
          ></input>
        </div>

        <div className="mb-3">
          <label value={schoolSize}>Select a school size:</label>
          <select
            className="form-control"
            onChange={(e) => setSchoolSize(e.target.value)}
          >
            <option value="school size"> -- Select a school size -- </option>
            <option value="1">small: under 2,000 </option>
            <option value="2">medium: 2,000-15,000</option>
            <option value="3">large: 15,000+ </option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Search Colleges
        </button>
      </form>
      <br></br>

      <div>
        {currentUser ? (
          <button
            type="submit"
            className="mt-5 btn btn-primary"
            onClick={handleAddFavorites}
          >
            Add Selected Colleges to Favorites
          </button>
        ) : (
          <>
            <p className="mt-3 lead">
              Create an account and login so you can save favorite colleges.
            </p>
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleRedirectRegister}
            >
              Signup to Save Favorites
            </button>
          </>
        )}

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Save to Favorites</th>

              <th scope="col">School Name</th>
              <th scope="col">School State</th>
              <th scope="col">School tuition in-state</th>
              <th scope="col">School Size</th>
            </tr>
          </thead>

          {results.map((result) => {
            return (
              <tbody>
                <tr key={result["school.id"]}>
                  {currentUser ? (
                    <th className="checkbox">
                      <input
                        onChange={(e) => handleCheck(e)}
                        className="form-check-input"
                        type="checkbox"
                        value={result["id"]}
                      />
                    </th>
                  ) : (
                    <th className="checkbox">
                      <input
                        onChange={(e) => handleCheck(e)}
                        className="form-check-input"
                        type="checkbox"
                        value={result["id"]}
                        disabled
                      />
                    </th>
                  )}

                  <td> {result["school.name"]}</td>
                  <td> {result["school.state"]}</td>
                  <td>${result["latest.cost.tuition.in_state"]}</td>
                  <td> {result["latest.student.size"]}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
