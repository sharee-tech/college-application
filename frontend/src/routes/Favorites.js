import FavoritesList from "../../src/components/FavoritesList";
import Navbar from "../components/Navbar";

export default function Favorites() {
  return (
    <div>
      <main className="container">
        <h1>Welcome to Favorites</h1>
        <div className="d-flex flex-row">
          <div className="col-sm-12">
            <FavoritesList />
          </div>
          {/* <div className="col-sm-4">Profile</div> */}
        </div>
      </main>
    </div>
  );
}
