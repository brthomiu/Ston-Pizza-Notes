import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
          <Route path="/profile" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreatePizzas />} />
          <Route path="/recipes" element={<ViewPizzas />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            marginTop: "2rem",
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        }}
      />
    </div>
  );
}

export default App;
