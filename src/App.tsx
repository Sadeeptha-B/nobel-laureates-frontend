import { useState, useCallback } from "react";
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
import Login from "./auth/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes = !isLoggedIn ? (
    <Routes>
      <Route path="/auth" element={<Login />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  ) : (
    <Routes>
      {" "}
      <Route path="/" element={<Laureates />} />
      <Route path="/laureates/:laureateId" element={<LaureateDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainHeader />
        <main className="mt-5">{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
