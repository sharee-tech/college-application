import FavoritesList from "../../src/components/FavoritesList";
import Navbar from "../components/Navbar";

export default function Favorites() {
  return (
    <div>
      <main className="container">
        <h1>Welcome to Favorites</h1>
        <div className="container">
          <FavoritesList />
        </div>
      </main>
    </div>
  );
}
