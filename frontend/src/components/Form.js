import { useState } from "react";
import React from "react";
import states from "../states";
import axios from "axios";
import cip_4_digit from "../cip_4_digit.json";
import CollegeService from "../services/CollegeService";
import { useNavigate } from "react-router-dom";

const userId = 54;

export default function Form() {
  const navigate = useNavigate();
  const [degreeType, setDegreeType] = useState(0);
  const [stateName, setStateName] = useState("");
  const [maxTuition, setMaxTuition] = useState(0);
  const [schoolSize, setSchoolSize] = useState(0);
  const [results, setResults] = useState([]);
  const [degreeProgramChosen, setDegreeProgramChosen] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleCheck = (event) => {
    var updatedList = [...favorites];
    if (event.target.checked) {
      updatedList = [...favorites, event.target.value];
    } else {
      updatedList.splice(favorites.indexOf(event.target.value), 1);
    }
    setFavorites(updatedList);
  };

  const handleAddFavorites = function() {
    alert("test");
    //loop through favorites array use .map() and for each call axios.create
    const data = { userId: userId, notes: null, appStatus: 0, collegeId: null };
    favorites.map((college) => {
      data["collegeId"] = college;
      CollegeService.create(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    });
    navigate("/favorites");
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
  const degreeProgramChosenParam = `&latest.programs.cip_4_digit.code=${degreeProgramChosen}`;

  console.log(favorites);
  console.log(results);
  console.log(degreePrograms[2].title);
  console.log(degreePrograms[2].code);
  console.log(degreeProgramChosen);
  console.log(baseUrl);

  const apiCall =
    baseUrl +
    fieldsDefault +
    tuitionParam +
    stateParam +
    degreeParam +
    schoolSizeParam +
    degreeProgramChosenParam;
  console.log(apiCall);
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // clear existing checked colleges
          setFavorites([]);
          axios.get(apiCall).then((res) => {
            setResults(res.data["results"]);
          });
        }}
      >
        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
          <label value={maxTuition}>Tuition maximum:</label>
          <input
            type="text"
            className="form-control"
            id=""
            placeholder="Enter maximum tuition"
            onChange={(e) => setMaxTuition(e.target.value)}
          ></input>
        </div>

        <div className="form-group">
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
          Submit
        </button>
      </form>
      <br></br>

      <div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAddFavorites}
        >
          Add Selected Colleges to Favorites
        </button>
        <table className="table" key="school list table">
          <thead key="table heading">
            <tr key="table row heading">
              <th scope="col" key="save to fav">
                Save to Favorites
              </th>
              <th scope="col" key="school name head">
                School Name
              </th>
              <th scope="col" key="school state head">
                School State
              </th>
              <th scope="col" key="school tuition head">
                School tuition in-state
              </th>
              <th scope="col" key="school size head">
                School Size
              </th>
            </tr>
          </thead>

          {results.map((result) => {
            return (
              <tbody>
                <tr key={result["school.id"]}>
                  <th className="checkbox" key="favorites checkbox">
                    <input
                      onChange={(e) => handleCheck(e)}
                      className="form-check-input"
                      type="checkbox"
                      value={result["id"]}
                      key={result["id"]}
                    />
                  </th>
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
