import { Link, useNavigate, useParams } from "react-router";
import { showCategory } from "../features/categorySlice";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const ShowCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryInfo = useSelector((state) => state.category.categoryInfo);
  const loading = useSelector((state) => state.category.showCategoryLoading);

  useEffect(() => {
    dispatch(showCategory(id));
  }, [dispatch, id]);

  const handleEditCategory = useCallback(() => {
    navigate(`/editCategory/${id}`);
  }, [id, navigate]);

  const handleDeleteCategory = useCallback(() => {
    navigate(`/deleteCategory/${id}`);
  }, [id, navigate]);

  return (
    <div>
      <h1>Show Category</h1>
      {loading ? (
        <p className="text-red-600 font-bold">Loading...</p>
      ) : (
        <>
          <div className="flex gap-5">
            <p className="text-green-600 font-extrabold text-xl">
              {categoryInfo.name}
            </p>
            <button
              onClick={handleEditCategory}
              className="text-green-600 font-bold"
            >
              edit
            </button>
            <button
              onClick={handleDeleteCategory}
              className="text-red-600 font-bold"
            >
              delete
            </button>
          </div>
          <Link to={`/allProducts/${id}`} className="text-green-600 font-bold">
            All Products
          </Link>
        </>
      )}
    </div>
  );
};

export default ShowCategory;
