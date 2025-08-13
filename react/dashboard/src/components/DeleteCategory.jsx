import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteCategory, showCategory } from "../features/categorySlice";
import { useCallback, useEffect } from "react";

const DeleteCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryInfo = useSelector((state) => state.category.categoryInfo);
  const loading = useSelector((state) => state.category.showCategoryLoading);

  useEffect(() => {
    dispatch(showCategory(id));
  }, [dispatch, id]);

  const handleDeleteCategory = useCallback(() => {
    if (!categoryInfo) return;
    dispatch(deleteCategory(id));
    navigate(`/allCategory`);
  }, [categoryInfo, dispatch, id, navigate]);

  return (
    <div>
      <h1>Delete Category</h1>
      {loading ? (
        <p className="text-red-600 font-bold">Loading...</p>
      ) : (
        <>
          <p className="text-red-600 font-bold" onClick={handleDeleteCategory}>
            yes delete
          </p>
          <p
            className="text-green-600 font-bold"
            onClick={() => navigate(`/allCategory`)}
          >
            no cancel
          </p>
        </>
      )}
    </div>
  );
};

export default DeleteCategory;
