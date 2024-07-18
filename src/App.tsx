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

const AUTH_STORAGE_KEY = "UserData";

function App() {
  const [token, setToken] = useState<string | null>();
  const [userId, setUserId] = useState<string | null>();

  const login = useCallback((uid: string, token: string) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ userId: uid, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  // Called on mount
  useEffect(() => {
    const userDataJson = localStorage.getItem(AUTH_STORAGE_KEY);
    if (userDataJson) {
      const userData = JSON.parse(userDataJson);

      if (userData.token) {
        login(userData.userId, userData.userId);
      }
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
      <Router>
        <MainHeader />
        <main className="mt-5">{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
