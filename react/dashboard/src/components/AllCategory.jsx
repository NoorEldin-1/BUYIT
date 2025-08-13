import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../features/categorySlice";
import { useNavigate } from "react-router";

const AllCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector(
    (state) => state.category.getAllCategoriesLoading
  );
  const [list, setList] = useState([]);

  const handleShowCategory = useCallback(
    (id) => {
      navigate(`/showCategory/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      setList(
        categories.map((category) => {
          return (
            <p
              onClick={() => handleShowCategory(category.id)}
              key={category.id}
              className="text-green-600 hover:text-blue-500 font-extrabold text-xl"
            >
              {category.name}
            </p>
          );
        })
      );
    } else {
      setList(<p className="text-red-600 font-bold">No categories found</p>);
    }
  }, [categories, handleShowCategory]);

  return (
    <div>
      <h1>All Category</h1>
      {loading ? (
        <p className="text-red-600 font-bold">Loading...</p>
      ) : (
        <div className="flex gap-2 flex-col">{list}</div>
      )}
    </div>
  );
};

export default AllCategory;
