import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editCategory, showCategory } from "../features/categorySlice";
import { useCallback, useEffect, useState } from "react";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryInfo = useSelector((state) => state.category.categoryInfo);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(categoryInfo.name);
  }, [categoryInfo.name]);

  useEffect(() => {
    dispatch(showCategory(id));
  }, [dispatch, id]);

  const handleEditCategory = useCallback(() => {
    if (!name) return;
    const info = {
      id,
      name,
    };
    dispatch(editCategory(info));
    navigate(`/allCategory`);
  }, [dispatch, id, name, navigate]);

  return (
    <div>
      <h1>Edit Category</h1>
      <input
        type="text"
        placeholder="category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleEditCategory}>edit</button>
    </div>
  );
};

export default EditCategory;
