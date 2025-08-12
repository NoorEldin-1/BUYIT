import Logout from "./Logout";
import EditAccount from "./EditAccount";
import { Link, Route, Routes } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <>
              <h1>Dashboard</h1>
              <Logout />
              <Link
                to="/editAccount"
                className="text-green-600 cursor-pointer block"
              >
                Edit Account
              </Link>
            </>
          }
        />
        <Route path="/editAccount" element={<EditAccount />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
