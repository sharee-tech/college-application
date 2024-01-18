import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CollegeDataService from "../services/CollegeService";
import CollegeCard from "./CollegeCard";
import Favorite from "./Favorite";
import UserContext from "../UserContext";

export default function FavoritesList() {
  // state variables
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const [toCompare, setToCompare] = useState([]);
  const [dataFromMySQL, setdataFromMySQL] = useState([]);
  const [dataFromCSC, setDataFromCSC] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  // get user/userid from context
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CollegeDataService.getAll(currentUser.id);
        setdataFromMySQL(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchDataFromCSC = async () => {
      const endpoints = [];
      //we need an array of collegeIds to iterate over and we run an api call to CollegeBoard for each collegeId which is why we are doing axios.all
      dataFromMySQL.map((college) =>
        endpoints.push(
          `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${process.env.REACT_APP_API_KEY}&id=${college.collegeId}&fields=school.name,school.city,school.state,latest.student.size,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,school.degrees_awarded.highest,id,school.school_url,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.average.overall,latest.admissions.act_scores.midpoint.cumulative`
        )
      );
      try {
        const responses = await axios.all(
          endpoints.map((endpoint) => axios.get(endpoint))
        );
        const colleges = responses.map(
          (response) => response.data["results"][0]
        );
        setDataFromCSC(colleges);
      } catch (error) {
        console.error("Error:", error);
      }
    }; // Make the second API call only if dataFromAPI1 is available

    if (dataFromMySQL.length > 0) {
      fetchDataFromCSC();
    }
  }, [dataFromMySQL]);

  useEffect(() => {
    if (dataFromCSC.length > 0) {
      const mergedData = mergeData(dataFromMySQL, dataFromCSC);
      setMergedData(mergedData);
    }
  }, [dataFromCSC]);

  const mergeData = (array1, array2) => {
    // Assuming each object has 'collegeId' in array1 and 'id' in array2
    return array1.map((obj1) => {
      const matchingObj2 = array2.find((obj2) => obj1.collegeId === obj2.id); // Merge the objects if a match is found

      return matchingObj2 ? { ...obj1, ...matchingObj2 } : obj1;
    });
  };

  return (
    <>
      {!dataFromCSC.length > 0 ? (
        <div className="d-flex align-items-center">
          <strong role="status">Loading...</strong>
          <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </div>
      ) : (
        <>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Compare</th>
                <th scope="col">College</th>
                <th scope="col">Application Status</th>
                <th scope="col">Notes</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {mergedData.map((college) => (
                <Favorite
                  key={college.id}
                  college={college}
                  selectedFavorites={selectedFavorites}
                  setSelectedFavorites={setSelectedFavorites}
                  toCompare={toCompare}
                  setToCompare={setToCompare}
                />
              ))}
            </tbody>
          </table>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {toCompare.map((college) => (
              <CollegeCard details={college} key={college.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
