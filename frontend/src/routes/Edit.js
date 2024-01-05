import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import EditFavorite from "../components/EditFavorite";

export default function Edit() {
  const routeParams = useParams();
  return (
    <div>
      <main className="container">
        <h1>Edit Favorite</h1>
        <EditFavorite collegeId={routeParams.id} />
      </main>
    </div>
  );
}
