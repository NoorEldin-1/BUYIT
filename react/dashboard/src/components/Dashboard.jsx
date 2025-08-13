import Logout from "./Logout";
import EditAccount from "./EditAccount";
import { Link, Route, Routes } from "react-router";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import ShowCategory from "./ShowCategory";
import AllCategory from "./AllCategory";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkOnUser } from "../features/authSlice";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import ShowProduct from "./ShowProduct";
import AllProducts from "./AllProducts";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkOnUser());
  }, [dispatch]);

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
              <Link
                to="/createCategory"
                className="text-green-600 cursor-pointer block"
              >
                Create Category
              </Link>
              <Link
                to="/allCategory"
                className="text-green-600 cursor-pointer block"
              >
                All Category
              </Link>
            </>
          }
        />
        <Route path="/editAccount" element={<EditAccount />} />
        <Route path="/createCategory" element={<CreateCategory />} />
        <Route path="/editCategory/:id" element={<EditCategory />} />
        <Route path="/deleteCategory/:id" element={<DeleteCategory />} />
        <Route path="/showCategory/:id" element={<ShowCategory />} />
        <Route path="/allCategory" element={<AllCategory />} />
        <Route path="/createProduct/:category_id" element={<CreateProduct />} />
        <Route
          path="/editProduct/:category_id/:product_id"
          element={<EditProduct />}
        />
        <Route
          path="/deleteProduct/:category_id/:product_id"
          element={<DeleteProduct />}
        />
        <Route
          path="/showProduct/:category_id/:product_id"
          element={<ShowProduct />}
        />
        <Route path="/allProducts/:category_id" element={<AllProducts />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
