import Navbar from "../components/Navbar";
// import AddCollege from "../components/AddCollege";
import ProfilePractice from "../components/ProfilePractice";

export default function Account() {
  return (
    <div>
      <main className="container">
        <h1>Welcome to Account</h1>
        <div className="container">
          {/* <AddCollege /> */}
          <ProfilePractice />
        </div>
      </main>
    </div>
  );
}
