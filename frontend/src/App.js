import logo from './logo.svg';
import './App.css';
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

	return (
		<Router>
      <Routes>
         <Route path="/register" element={<Register/>} />
         </Routes>
		</Router>

	);
}

export default App;