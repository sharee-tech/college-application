import { useState } from "react";
import { useEffect } from "react";

function FetchExample() {
  //window.addEventListener("load", function() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch(
      "http://api.data.gov/ed/collegescorecard/v1/schools.json?&api_key=${process.env.REACT_APP_API_KEY}"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setResults(data.results);
      });
  }, []);

  var filteredResults = results.filter(
    (element) => element.school.degrees_awarded.highest == 2
  );
  var filteredResults = results.filter((results) => {
    return (
      results["latest.cost.tuition.in_state"] <= maxTuition &&
      results["latest.student.size"] <= schoolSize &&
      results["school.degrees_awarded.highest"] == degreeType &&
      results["school.state"] == stateName
    );
  });

  return (
    <div>
      {filteredResults.map((result) => {
        return (
          <div key={result.id}>
            <ul>
              <li>School name: {result.latest.school.name}</li>
              <li>School city: {result.latest.school.city}</li>
              <li>School tuition: {result.latest.cost.tuition.out_of_state}</li>
              <li>School size: {result.latest.student.size}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

schoolRangeSelector(schoolSize);

function schoolRangeSelector(schoolSize) {
  if (schoolSize == 100000) {
    setSchoolRange == 15000;
  } else if (schoolSize == 14999) {
    setSchoolRange === 5000;
  } else setSchoolRange === 1;
}

//)}

export default FetchExample;
