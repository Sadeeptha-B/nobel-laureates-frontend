import { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

import Laureates from "./laureates/pages/Laureates";
import LaureateDetails from "./laureates/pages/LaureateDetails";
import MainHeader from "./shared/components/Navigation/MainHeader";
import About from "./laureates/pages/About";
import Auth from "./auth/Auth";
import { USERDATA_STORAGE_KEY } from "./constants";
import { getUserDataFromLocalStorage } from "./shared/utils/localstorage-helper";
import { UserAuthData } from "./models/UserData";
import AxiosProvider from "./shared/components/Utils/AxiosProvider";

function App() {
  const [token, setToken] = useState<string | null>();
  const [userId, setUserId] = useState<string | null>();

  const login = useCallback((userId: string, email: string, token: string) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem(
      USERDATA_STORAGE_KEY,
      JSON.stringify({ userId, email, token } as UserAuthData)
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(USERDATA_STORAGE_KEY);
  }, []);

  // Called on mount
  useEffect(() => {
    const userData = getUserDataFromLocalStorage();
    if (userData) {
      login(userData.userId, userData.email, userData.token);
    }
  }, [login]);

  let routes = !token ? (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Laureates />} />
      <Route path="/laureates/:laureateId" element={<LaureateDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <AxiosProvider>
        <Router>
          <MainHeader />
          <main className="mt-5">{routes}</main>
        </Router>
      </AxiosProvider>
    </AuthContext.Provider>
  );
}

export default App;
