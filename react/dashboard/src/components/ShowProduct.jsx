import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { showProduct } from "../features/productSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ShowProduct = () => {
  const { category_id, product_id } = useParams();
  const dispatch = useDispatch();
  const productInfo = useSelector((state) => state.product.productInfo);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showProduct({ category_id, product_id }));
  }, [dispatch, category_id, product_id]);

  return (
    <div>
      <h1>Show Product</h1>
      {productInfo && (
        <>
          <div className="flex gap-2 text-blue-400 font-bold hover:text-green-400">
            <p>{productInfo.name}</p>
            <p>{productInfo.info}</p>
            <p>{productInfo.price}</p>
          </div>
          <button
            onClick={() =>
              navigate(`/editProduct/${category_id}/${product_id}`)
            }
            className="text-green-600 font-bold cursor-pointer mr-2"
          >
            edit
          </button>
          <button
            onClick={() =>
              navigate(`/deleteProduct/${category_id}/${product_id}`)
            }
            className="text-red-600 font-bold cursor-pointer"
          >
            delete
          </button>
        </>
      )}
    </div>
  );
};

export default ShowProduct;
