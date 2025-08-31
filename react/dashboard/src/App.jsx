import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  if (window.localStorage.getItem("token")) {
    return <Dashboard />;
  } else {
    return <Login />;
  }
}

export default App;
