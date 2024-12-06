import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login/Login';
import NotFound from './components/Home/NotFound//NotFound';
import Signup from './components/Auth/SignUp/SignUp';
import LandingPage from './components/Home/LandingPage/LandingPage';
import SearchResultsPage from './components/Home/LandingPage/Header/SearchResultsPage';
// import VerifyEmail from './Components/auth/VerifyEmail/VerifyEmail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<SearchResultsPage />} />

      {/* <Route path="/verify-email" element={<VerifyEmail />} /> */}
      {/* <Route path="/complete-profile" element={<CompleteProfile />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
