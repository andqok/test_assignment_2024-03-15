import { Routes, Route } from "react-router-dom";

import './reset.css';
import './base.css';
import CreatePassword from "./pages/create-password";
import ResetPassword from "./pages/reset-password";
import Login from "./pages/login";
import {AuthProvider} from "./services/auth/AuthContext";
import Home from "./pages/home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
