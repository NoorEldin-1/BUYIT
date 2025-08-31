import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { DrawerHeader, Main } from "./Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  changeCategoryInfo,
  getAllCategoriesPaginated,
  getNextCategories,
} from "../features/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { changeDialog } from "../features/dialogSlice";
import { useNavigate } from "react-router";
import { Accordion, AccordionDetails, AccordionSummary } from "./Dashboard";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

const AllCategory = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.category.categories);
  const loading = useSelector(
    (state) => state.category.getAllCategoriesLoading
  );
  const nextCategoriesLink = useSelector(
    (state) => state.category.nextCategoriesLink
  );
  const getNextCategoriesLoading = useSelector(
    (state) => state.category.getNextCategoriesLoading
  );
  const [categories, setCategories] = useState(
    <Typography
      variant="h6"
      fontWeight={"bold"}
      textTransform={"uppercase"}
      align="center"
    >
      no categories found
    </Typography>
  );

  const singleRow = useCallback(
    (row) => {
      const handleEdit = () => {
        dispatch(changeCategoryInfo(row));
        dispatch(changeDialog("editCategory"));
      };

      const handleDelete = () => {
        dispatch(changeCategoryInfo(row));
        dispatch(changeDialog("deleteCategory"));
      };

      const handleShow = () => {
        navigate(`/category/${row.id}`);
      };

      return (
        <Accordion key={row.id}>
          <AccordionSummary>
            <Typography component="span">
              {row.name} #{row.id}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              fontWeight="bold"
              textTransform={"uppercase"}
              display={"inline"}
            >
              name:{" "}
            </Typography>
            {row.name}
            <br />
            <Typography
              variant="body2"
              fontWeight="bold"
              textTransform={"uppercase"}
              display={"inline"}
            >
              created at:{" "}
            </Typography>
            {row.created_at}
            <br />
            <Typography
              variant="body2"
              fontWeight="bold"
              textTransform={"uppercase"}
              display={"inline"}
            >
              products count:{" "}
            </Typography>
            {row.products_count}
            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton color="primary" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleShow}>
                <ProductionQuantityLimitsIcon />
              </IconButton>
            </Box>
          </AccordionDetails>
        </Accordion>
      );
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (rows.length > 0) {
      setCategories(<div>{rows.map((row) => singleRow(row))}</div>);
    } else {
      setCategories(
        <Typography
          variant="h6"
          fontWeight={"bold"}
          textTransform={"uppercase"}
          align="center"
        >
          no categories found
        </Typography>
      );
    }
  }, [rows, singleRow]);

  useEffect(() => {
    dispatch(getAllCategoriesPaginated());
  }, [dispatch]);

  const element = useMemo(() => {
    return (
      <Main open={open} sx={{ overflow: "hidden" }}>
        <DrawerHeader />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            categories
          </Typography>
          {loading ? (
            <CircularProgress
              sx={{
                display: "flex",
                mx: "auto",
              }}
            />
          ) : (
            <>
              {categories}
              <Button
                variant="outlined"
                sx={{ width: "fit-content", ml: "auto" }}
                startIcon={<MoreTimeIcon />}
                disabled={
                  getNextCategoriesLoading || nextCategoriesLink === null
                }
                loading={getNextCategoriesLoading}
                onClick={() => dispatch(getNextCategories(nextCategoriesLink))}
              >
                show more
              </Button>
            </>
          )}
        </Box>
      </Main>
    );
  }, [
    categories,
    dispatch,
    getNextCategoriesLoading,
    loading,
    nextCategoriesLink,
    open,
  ]);

  return element;
};

export default AllCategory;
