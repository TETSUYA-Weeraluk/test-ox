import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemonById } from "../../store/reducer/homeSlice";
import { Button } from "@mui/joy";

const PokemonDetailPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pokemonById, loading } = useSelector(
    (state: RootState) => state.home
  );
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    if (name) {
      dispatch(fetchPokemonById(name));
    }
  }, [name, dispatch]);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (loading === "failed") {
    return <p>Error loading data..</p>;
  }

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="p-4">
      <Button variant="solid" onClick={backToHome}>
        Back
      </Button>

      <div className="grid grid-cols-2 items-center">
        <div className="flex flex-col gap-4">
          <h1>Name : {name}</h1>
          <img
            className="w-48 h-48 object-contain"
            src={`https://img.pokemondb.net/artwork/${name}.jpg`}
            alt={name}
          />
        </div>
        <div>
          <h1>Stats</h1>
          <ul className="list-disc ml-4">
            {pokemonById.stats.map((stat, index) => (
              <li key={index}>
                {stat.stat.name} : {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
