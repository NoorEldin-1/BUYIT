import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, showProduct } from "../features/productSlice";
import { useNavigate } from "react-router";

const EditProduct = () => {
  const { category_id, product_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productInfo = useSelector((state) => state.product.productInfo);
  const [info, setInfo] = useState({
    name: "",
    info: "",
    price: "",
    image: "",
    category_id: category_id,
    product_id: product_id,
  });

  const handleEditProduct = useCallback(() => {
    if (!info.name || !info.info || !info.price) return;
    if (info.image && !info.image.type.startsWith("image/")) return;
    if (isNaN(info.price)) return;
    dispatch(editProduct(info));
    navigate(`/allProducts/${category_id}`);
  }, [category_id, dispatch, info, navigate]);

  useEffect(() => {
    dispatch(showProduct({ category_id, product_id }));
  }, [dispatch, category_id, product_id]);

  useEffect(() => {
    if (productInfo) {
      setInfo({
        name: productInfo.name,
        info: productInfo.info,
        price: productInfo.price,
        category_id: category_id,
        product_id: product_id,
      });
    }
  }, [category_id, productInfo, product_id]);

  return (
    <div>
      <h1>Edit Product</h1>
      <input
        value={info.name}
        type="text"
        placeholder="name"
        onChange={(e) => setInfo({ ...info, name: e.target.value })}
      />
      <textarea
        value={info.info}
        placeholder="info"
        onChange={(e) => setInfo({ ...info, info: e.target.value })}
      ></textarea>
      <input
        value={info.price}
        type="text"
        placeholder="price"
        onChange={(e) => setInfo({ ...info, price: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setInfo({ ...info, image: e.target.files[0] })}
      />
      <button onClick={handleEditProduct}>Edit</button>
    </div>
  );
};

export default EditProduct;
