import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import CircleNavbar from "./components/CircleNavbar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <CircleNavbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
