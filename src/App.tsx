import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Signup from "./features/auth/pages/signup";
import Login from "./features/auth/pages/login";
import { useAuthStore } from "./features/auth/store/auth.store";
import { Home } from "./features/Home/pages/Home";

function App() {
  const { user, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1a1a1a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#eda52d]"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;