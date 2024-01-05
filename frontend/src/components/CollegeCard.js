export default function CollegeCard({ details }) {
  return (
    <div className="col">
      <div className="card mt-5 h-100">
        <div className="card-body">
          <h5 className="card-title">{details["school.name"]}</h5>
          <h6>{`${details["school.degrees_awarded.highest"]} year | ${details["school.city"]}, ${details["school.state"]}`}</h6>
          <hr></hr>
          <p className="card-text">
            Student Body Size:<br></br>
            {details["latest.student.size"]}
          </p>
          <p className="card-text">
            In-state Tuition:<br></br>
            {details["latest.cost.tuition.in_state"] === null
              ? "Data not provided"
              : "$" + details["latest.cost.tuition.in_state"]}
          </p>
          <p className="card-text">
            Out-of-state Tuition:<br></br>
            {details["latest.cost.tuition.out_of_state"] === null
              ? "Data not provided"
              : "$" + details["latest.cost.tuition.out_of_state"]}
          </p>
          <p className="card-text">
            Admission Rate:<br></br>
            {details["latest.admissions.admission_rate.overall"]}
          </p>
          <p className="card-text">
            Average SAT Score: <h6></h6>
          </p>
          <p className="card-text">
            Average ACT Score: <h6></h6>
          </p>
        </div>
        <div className="card-footer">
          <p className="card-text">More info...</p>
          <a
            href={
              details["school.school_url"].includes("http")
                ? details["school.school_url"]
                : `https://${details["school.school_url"]}`
            }
            target="_blank"
            className="btn btn-primary"
          >
            Visit
          </a>
          {/* <small className="text-muted">Last updated 3 mins ago</small> */}
        </div>
      </div>
    </div>
  );
}
