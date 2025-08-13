import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../features/productSlice";
import { Link, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts(category_id));
  }, [dispatch, category_id]);

  useEffect(() => {
    if (products) {
      setList(
        products.map((product) => {
          return (
            <div
              key={product.id}
              className="flex gap-2 text-blue-400 font-bold hover:text-green-400"
              onClick={() =>
                navigate(`/showProduct/${category_id}/${product.id}`)
              }
            >
              {"==="}
              <p>{product.name}</p>
              <p>{product.info}</p>
              <p>{product.price}</p>
            </div>
          );
        })
      );
    }
  }, [category_id, navigate, products]);

  return (
    <div>
      <h1>All Products</h1>
      <Link to={`/createProduct/${category_id}`}>Create Product</Link>
      {list.length === 0 ? (
        <p className="text-red-600 font-bold">No products found</p>
      ) : (
        list
      )}
    </div>
  );
};

export default AllProducts;
