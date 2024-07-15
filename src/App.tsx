import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Laureates from "./laureates/pages/Laureates";
import Login from "./auth/Login";
import LaureateDetails from "./laureates/components/LaureateDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Laureates />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/laureates/:laureateId" element={<LaureateDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </Router>
  );
}

export default App;
