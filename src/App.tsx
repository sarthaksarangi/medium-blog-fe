import "./App.css";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("jwtToken");
    const isValid = true;
    if (token && isValid) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div>{isAuthenticated() ? <Blogs /> : <Signup />}</div>
    </>
  );
}

export default App;
