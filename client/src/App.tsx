import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Page Style
import "./App.css";
// Page/Component imports
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import About from "./pages/About";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreatePizzas from "./pages/CreatePizzas";
import ViewPizzas from "./pages/ViewPizzas";

// Main app component
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/createpizzas" element={<CreatePizzas />} />
          <Route path="/viewpizzas" element={<ViewPizzas />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
