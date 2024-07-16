import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Laureates from "./laureates/pages/Laureates";
import Login from "./auth/Login";
import LaureateDetails from "./laureates/pages/LaureateDetails";
import MainHeader from "./shared/components/Navigation/MainHeader";
import About from "./laureates/pages/About";

function App() {
  return (
    <Router>
      <MainHeader />
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Laureates />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/laureates/:laureateId" element={<LaureateDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
