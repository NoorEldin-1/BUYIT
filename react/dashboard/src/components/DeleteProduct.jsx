import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { deleteProduct } from "../features/productSlice";
import { useNavigate, useParams } from "react-router";

const DeleteProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category_id, product_id } = useParams();
  const handleDeleteProduct = useCallback(() => {
    const info = {
      category_id,
      product_id,
    };
    dispatch(deleteProduct(info));
    navigate(`/allProducts/${category_id}`);
  }, [category_id, dispatch, navigate, product_id]);
  return (
    <div>
      <h1>Delete Product</h1>
      <button
        onClick={handleDeleteProduct}
        className="text-red-600 font-bold cursor-pointer mr-2"
      >
        delete
      </button>
      <button
        onClick={() => navigate(`/allProducts/${category_id}`)}
        className="text-green-600 font-bold cursor-pointer"
      >
        cancel
      </button>
    </div>
  );
};

export default DeleteProduct;
