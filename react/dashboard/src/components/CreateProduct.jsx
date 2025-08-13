import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { createProduct } from "../features/productSlice";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

const CreateProduct = () => {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    name: "",
    info: "",
    price: "",
    image: "",
    category_id: category_id,
  });

  const handleCreateProduct = useCallback(() => {
    if (!info.name || !info.info || !info.price || !info.image) return;
    if (info.image && !info.image.type.startsWith("image/")) return;
    if (isNaN(info.price)) return;
    dispatch(createProduct(info));
    navigate(`/allProducts/${category_id}`);
  }, [category_id, dispatch, info, navigate]);

  return (
    <div>
      <h1>Create Product</h1>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setInfo({ ...info, name: e.target.value })}
      />
      <textarea
        placeholder="info"
        onChange={(e) => setInfo({ ...info, info: e.target.value })}
      ></textarea>
      <input
        type="text"
        placeholder="price"
        onChange={(e) => setInfo({ ...info, price: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setInfo({ ...info, image: e.target.files[0] })}
      />
      <button onClick={handleCreateProduct}>Create</button>
    </div>
  );
};

export default CreateProduct;
