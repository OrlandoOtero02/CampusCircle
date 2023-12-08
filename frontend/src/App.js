//App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import JoinableCircles from './pages/JoinableCircles';
import Navbar from './components/Navbar';

import CircleNavbar from "./components/CircleNavbar"

import ForgotPassword from './pages/ForgotPassword';

import Profile from './pages/Profile';
import UserProfile from './pages/userProfile';
import Settings from './pages/Settings';
import Inbox from './pages/Inbox';

import UsersList from './pages/UsersList'
import FollowingList from './pages/FollowingList';
import BlockedUsers from './pages/BlockedUsers';

import MapPage from './pages/MapPage';


function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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
              element={user ? <JoinableCircles /> : <Navigate to="/"/>}
            />

            <Route
              path="/forgot-password"
              element={!user ? <ForgotPassword /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile/> : <Navigate to="/" />}
            />
            <Route 
              path="/settings"
              element={user ? <Settings/> : <Navigate to="/" />}
            />
            <Route 
              path="/users"
              element={user ? <UsersList/> : <Navigate to="/" />}
            />
            <Route
              path="/inbox"
              element={user ? <Inbox/> : <Navigate to="/" />}
            />
            <Route 
              path="/following"
              element={user ? <FollowingList/> : <Navigate to="/" />}
            />
            {/* <Route
              path="/profile/:userId"
              element={user ? <UserProfile /> : <Navigate to="/" />}
            /> */}
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route 
              path="/blockedUsers"
              element={user ? <BlockedUsers/> : <Navigate to="/" />}
            />
            <Route 
              path="/map"
              element={user ? <MapPage/> : <Navigate to="/" />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
