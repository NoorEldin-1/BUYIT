import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  if (
    window.localStorage.getItem("username") &&
    window.localStorage.getItem("password")
  ) {
    return <Dashboard />;
  } else {
    return <Login />;
  }
}

export default App;
