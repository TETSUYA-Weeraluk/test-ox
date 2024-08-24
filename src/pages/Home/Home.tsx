import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store/hook";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import winImage from "../../assets/win.gif";
import loseImage from "../../assets/lose.gif";
import drawImage from "../../assets/draw.gif";

interface Boarding {
  selectBy: "user" | "bot";
  selected: number;
}

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [myScore, setMyScore] = useState(0);
  const rowsAndColumns = useMemo(() => [3, 3], []);
  const [arrayButton, setArrayButton] = useState<JSX.Element[]>([]);
  const [boarding, setBoarding] = useState<Boarding[]>();
  const [selected, setSelected] = useState<number[]>([]);
  const [stackWin, setStackWin] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [isWinner, setIsWinner] = useState<string | null>(null);
  const [allScore, setAllScore] = useState<{ user: string; score: number }[]>(
    []
  );
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const stackWinUpdateScore = 2;

  useEffect(() => {
    const score = localStorage.getItem("score-xo");
    const parse = JSON.parse(score || "[]");
    if (score) {
      setAllScore(JSON.parse(score));
      const findMyScore = parse.find(
        (item: { user: string; score: number }) => item.user === user.name
      );
      setMyScore(findMyScore?.score || 0);
    } else {
      const newScore = [{ user: user.name, score: 0 }];
      setAllScore(newScore);
    }
  }, [user]);

  const updateTolocalStorage = () => {
    const myScoreIndex = allScore.findIndex((item) => item.user === user.name);
    const newScore = [...allScore];
    if (myScoreIndex !== -1) {
      newScore[myScoreIndex].score = myScore;
    } else {
      newScore.push({ user: user.name, score: myScore });
    }
    localStorage.setItem("score-xo", JSON.stringify(newScore));
  };

  useEffect(() => {
    updateButton();
  }, [boarding]);

  const updateButton = () => {
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
            "&:disabled": {
              color: "black",
              backgroundColor: selected.includes(i) ? "#ECCEAE" : "transparent",
            },
            "&:hover": {
              backgroundColor: "#ECCEAE",
            },
          }}
          onClick={() => {
            userSelectBoarding(i);
          }}
          disabled={
            boarding?.find((item) => item.selected === i) !== undefined ||
            disabledButton
          }
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
  };

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
    setSelected(newSelected);
    setBoarding(newBoarding);
    setDisabledButton(true);

    const isWinner = checkWinner(newBoarding);

    setTimeout(() => {
      if (isWinner === "user") {
        setIsWinner("You Win");
        handleClickOpen();
        return;
      } else if (isWinner === "draw") {
        handleClickOpen();
        setIsWinner("Draw");
        return;
      } else {
        botSelectBoarding(newBoarding, newSelected);

        setBoarding([...newBoarding]);

        setDisabledButton(false);
        const isWinner = checkWinner(newBoarding);
        if (isWinner) {
          handleClickOpen();
          if (isWinner === "bot") {
            setIsWinner("You Lose");
            return;
          }
        }
      }
    }, 500);
  };

  const resetBoarding = () => {
    setBoarding([]);
    setSelected([]);
    setIsWinner(null);
    updateTolocalStorage();
    setDisabledButton(false);
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
        if (stackWin === stackWinUpdateScore) {
          setMyScore(myScore + 2);
          setStackWin(0);
        } else {
          setMyScore(myScore + 1);
        }
        setStackWin((prev) => prev + 1);
        return "user";
      } else {
        setMyScore(myScore - 1);
        setStackWin(0);
        return "bot";
      }
    } else {
      if (userSelected.length + botSelected.length === 9) {
        return "draw";
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetBoarding();
  };

  return (
    <div className="w-full h-full space-y-4">
      <div>
        <h1 className="text-xl font-bold">วิธีการเล่นเกม XO</h1>
        <p>1.แบ่งเป็นฝ่าย X (ผู้เล่น) และ ฝ่าย O</p>
        <p>2.ผู้เล่นเลือกตำแหน่งที่ต้องการเล่น</p>
        <p>3.เมื่อผู้เล่นเลือกเสร็จ รอให้บอทเลือกตำแหน่ง</p>
        <p>4.เมื่อเกมจบ จะมีการแสดงผลลัพธ์</p>
        <p>5.หากผู้เล่นชนะ จะได้ 1 คะแนน</p>
        <p>6.หากผู้เล่นแพ้ จะลด 1 คะแนน</p>
        <p>7.หากเสมอ จะไม่มีการเพิ่มหรือลดคะแนน</p>
        <p>
          8.หากผู้เล่นชนะติดต่อกัน 3 ครั้ง จะได้เพิ่มอีก 1 คะแนน เป็น 2 คะแนน
        </p>
      </div>

      <div className="p-4 border">
        {allScore
          .sort((a, b) => b.score - a.score)
          .map((item, index) => (
            <div className="flex items-center justify-between" key={index}>
              <span
                style={{
                  fontWeight: item.user === user.name ? "bold" : "normal",
                  color: item.user === user.name ? "#ECCEAE" : "white",
                }}
              >
                {item.user}
              </span>
              <span
                style={{
                  color: item.user === user.name ? "#ECCEAE" : "white",
                }}
              >
                Score: {item.score}
              </span>
            </div>
          ))}
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

      <>
        <Dialog
          open={open && isWinner !== null}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {isWinner && (
            <>
              <DialogTitle
                id="alert-dialog-title"
                sx={{
                  textAlign: "center",
                }}
              >
                {isWinner}
              </DialogTitle>
              <DialogContent>
                <img
                  src={
                    isWinner === "You Win"
                      ? winImage
                      : isWinner === "You Lose"
                      ? loseImage
                      : drawImage
                  }
                  alt="win"
                  style={{ width: "100%" }}
                />
              </DialogContent>
            </>
          )}
        </Dialog>
      </>
    </div>
  );
};

export default Home;
