import axios from "axios";

const handleLogin = async (email, password) => {
  try {
    const response = await axios.post("https://reqres.in/api/login", {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Store token
      window.location.href = "/users"; // Redirect to Users List
    }
  } catch (error) {
    console.error("Login failed", error);
    alert("Invalid credentials. Please try again.");
  }
};
