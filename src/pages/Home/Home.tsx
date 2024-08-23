import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { fetchPokemon, welcomeToHomePage } from "../../store/reducer/homeSlice";
import { Button, Input } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const welcomeText = useSelector((state: RootState) => state.home.welcomeText);
  const pokemons = useSelector((state: RootState) => state.home.pokemon);
  const [inputWelcomeText, setInputWelcomeText] = useState("");

  useEffect(() => {
    dispatch(fetchPokemon({ limit: 15, page: 0 }));
  }, [dispatch]);

  const changeWelcomeTextWithInput = () => {
    dispatch(welcomeToHomePage(inputWelcomeText));
    setInputWelcomeText("");
  };

  const helloworldText = () => {
    dispatch(welcomeToHomePage("Hell world"));
  };

  const clearText = () => {
    dispatch(welcomeToHomePage(""));
  };

  const handleMoreDetail = (monster: string) => {
    navigate(`/pokemon/${monster}`);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Text : {welcomeText}</h1>
      <div className="flex gap-2">
        <Input
          placeholder="Change text"
          variant="outlined"
          onChange={(e) => setInputWelcomeText(e.target.value)}
          value={inputWelcomeText}
        />

        <Button variant="solid" onClick={() => changeWelcomeTextWithInput()}>
          Change text
        </Button>
        <Button variant="solid" onClick={() => helloworldText()}>
          Hello world
        </Button>
        <Button variant="solid" onClick={() => clearText()}>
          Clear
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {pokemons &&
          pokemons.map((monster, index) => (
            <div
              className="flex flex-col gap-4 items-center border rounded-md shadow-md p-4"
              key={index}
            >
              <h1>Pokemon : {monster.name}</h1>
              <img
                className="w-48 h-48 object-contain"
                src={`https://img.pokemondb.net/artwork/${monster.name}.jpg`}
                alt={monster.name}
              />
              <Button
                variant="solid"
                onClick={() => handleMoreDetail(monster.name)}
              >
                More Detail
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
