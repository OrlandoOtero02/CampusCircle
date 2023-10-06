import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import JoinableCircles from './pages/JoinableCircles';
import Navbar from './components/Navbar';
import CircleNavbar from "./components/CircleNavbar"

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <CircleNavbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/joinablecircles"
              element={!user ? <Signup /> : <JoinableCircles />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
