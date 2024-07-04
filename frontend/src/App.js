
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthProvider";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route index element={<Login />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        </AuthContextProvider>
    </div>
  );
}

export default App;
