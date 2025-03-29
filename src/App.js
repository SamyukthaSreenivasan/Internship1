import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import EditUserPage from "./pages/EditUserPage";
import AuthWrapper from "./components/AuthWrapper"; // Import AuthWrapper

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route (Login Page) */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected routes inside AuthWrapper */}
        <Route 
          path="/users" 
          element={
            <AuthWrapper>
              <UserPage />
            </AuthWrapper>
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <AuthWrapper>
              <EditUserPage />
            </AuthWrapper>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
