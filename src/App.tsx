import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const isValid = true;

    if (token && isValid) {
      navigate("/blogs"); // Redirect authenticated users to blogs
    } else {
      navigate("/signup"); // Redirect unauthenticated users to signup
    }
  }, []);
  return <></>;
}

export default App;
