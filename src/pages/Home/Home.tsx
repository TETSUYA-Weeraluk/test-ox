import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store/hook";
import { Button } from "@mui/material";

interface Boarding {
  selectBy: "user" | "bot";
  selected: number;
}

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [score, setScore] = useState(0);
  const rowsAndColumns = useMemo(() => [3, 3], []);
  const [arrayButton, setArrayButton] = useState<JSX.Element[]>([]);
  const [boarding, setBoarding] = useState<Boarding[]>();
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const newArrayButton = [];
    for (let i = 0; i < rowsAndColumns[0] * rowsAndColumns[1]; i++) {
      newArrayButton.push(
        <Button
          key={i}
          variant="contained"
          sx={{
            width: "100%",
            height: "200px",
            backgroundColor: "transparent",
            border: "1px solid #ECCEAE",
          }}
          onClick={() => {
            userSelectBoarding(i);
          }}
        >
          {boarding?.find((item) => item.selected === i)
            ? boarding?.find((item) => item.selected === i)?.selectBy === "user"
              ? "X"
              : "O"
            : ""}
        </Button>
      );
    }
    setArrayButton(newArrayButton);
  }, [rowsAndColumns, boarding]);

  const generateRandomSelect = (
    totalOptions: number,
    allSelected: number[]
  ) => {
    const allOptions = Array.from({ length: totalOptions }, (_, i) => i);
    const options = allOptions.filter((item) => !allSelected.includes(item));
    const randomIndex = Math.floor(Math.random() * options.length);
    setSelected([...allSelected, options[randomIndex]]);
    return options[randomIndex];
  };

  const botSelectBoarding = (board: Boarding[], allSelected: number[]) => {
    const totalOptions = rowsAndColumns[0] * rowsAndColumns[1];

    const botSelect = generateRandomSelect(totalOptions, allSelected);

    board.push({ selectBy: "bot", selected: botSelect });
  };

  const userSelectBoarding = (index: number) => {
    const newBoarding = boarding ? [...boarding] : [];

    newBoarding.push({ selectBy: "user", selected: index });
    const newSelected = [...selected, index];

    setBoarding(newBoarding);

    const isWinner = checkWinner(newBoarding);

    setTimeout(() => {
      if (isWinner) {
        if (isWinner === "user") {
          alert("You win");
          return;
        } else if (isWinner === "bot") {
          alert("You lose");
          return;
        } else {
          alert("Draw");
          return;
        }
      } else {
        botSelectBoarding(newBoarding, newSelected);
        setBoarding([...newBoarding]);
      }
    }, 500);
  };

  const resetBoarding = () => {
    setBoarding([]);
    setSelected([]);
  };

  const checkWinner = (board: Boarding[]) => {
    const userSelected = board
      .filter((item) => item.selectBy === "user")
      .map((item) => item.selected);
    const botSelected = board
      .filter((item) => item.selectBy === "bot")
      .map((item) => item.selected);

    const winner = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ].find((item) => {
      if (
        item.every((i) => userSelected.includes(i)) ||
        item.every((i) => botSelected.includes(i))
      ) {
        return true;
      }
      return false;
    });

    if (winner) {
      if (winner.every((i) => userSelected.includes(i))) {
        setScore(score + 1);
        return "user";
      } else if (winner.every((i) => botSelected.includes(i))) {
        return "bot";
      } else {
        return "draw";
      }
    }
  };

  return (
    <div className="w-full h-full space-y-4">
      <button onClick={resetBoarding}>reset</button>
      <div className="flex items-center justify-between p-4 border">
        <span>{user.name}</span>
        <span>Score: {score}</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${rowsAndColumns[1]}, 1fr)`,
          gap: "16px",
        }}
      >
        {arrayButton}
      </div>
    </div>
  );
};

export default Home;
