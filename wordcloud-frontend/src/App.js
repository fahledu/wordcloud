import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import GroupCloud from "./pages/GroupCloud";
import WordForm from "./pages/WordForm";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/group/:groupName" element={<GroupCloud />} />
        <Route path="/group/:groupName/submit" element={<WordForm />} />
      </Routes>
    </Router>
  );
}

export default App;