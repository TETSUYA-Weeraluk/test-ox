import { FaRegUserCircle } from "react-icons/fa";
import { useAppSelector } from "../../store/hook";
import { IoMdExit } from "react-icons/io";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeaderDefault = () => {
  const navgiate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.setItem("token-xo", "");
    navgiate("/auth/login");
  };

  return (
    <div className="py-4 px-8 w-full flex items-center justify-between">
      <h1 className="text-2xl font-bold">Game XO</h1>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <FaRegUserCircle size={20} />
          <span>{user.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            sx={{
              color: "#fff",
              borderColor: "#fff",
              "&:hover": {
                color: "red",
                borderColor: "red",
              },
            }}
            variant="outlined"
            startIcon={<IoMdExit size={20} />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderDefault;
