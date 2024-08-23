import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../store/hook";
import { addUsers, User } from "../store/reducer/authSlice";

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken_] = useState(localStorage.getItem("token-xo") || null);
  const dispatch = useAppDispatch();

  const setToken = (newToken: string) => {
    setToken_(newToken);
    localStorage.setItem("token-xo", newToken);
  };

  useEffect(() => {
    if (token) {
      const checkToken = async () => {
        try {
          await axios.get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
          );
          localStorage.setItem("token-xo", token);

          const decodedToken = jwtDecode(token) as User;
          dispatch(addUsers(decodedToken));
        } catch (error) {
          localStorage.removeItem("token-xo");
        }
      };

      checkToken();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token-xo");
    }
  }, [token]);

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
