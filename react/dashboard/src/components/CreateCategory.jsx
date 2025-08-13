import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../features/categorySlice";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const loading = useSelector((state) => state.category.createCategoryLoading);

  const handleCreateCategory = useCallback(() => {
    if (!name) return;
    dispatch(createCategory(name));
  }, [dispatch, name]);

  return (
    <div>
      <h1>Create Category</h1>
      <input
        value={name}
        type="text"
        placeholder="category name"
        onChange={(e) => setName(e.target.value)}
      />
      {loading ? (
        <p className="text-red-600 font-bold">Loading...</p>
      ) : (
        <button onClick={handleCreateCategory}>create</button>
      )}
    </div>
  );
};

export default CreateCategory;
