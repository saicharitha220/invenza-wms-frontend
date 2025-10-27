
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import SignupPage from './pages/SignupPage';
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
         <Route path="/signup" element={<SignupPage />} />
         <Route path="/dashboard" element={<Dashboard />} />
       
      </Routes>
    </Router>
  );
}

export default App;
