import { useCallback, useEffect, useMemo, useState } from "react";
import { DrawerHeader, Main } from "./Dashboard";
import { Box, Button, CircularProgress, Icon, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Accordion, AccordionDetails, AccordionSummary } from "../App";

const MainWidget = ({ open }) => {
  const navigate = useNavigate();
  const totalUser = useSelector((state) => state.user.totalUsers);
  const totalCategories = useSelector(
    (state) => state.category.totalCategories
  );
  const totalProducts = useSelector((state) => state.product.totalProducts);
  const allLatestUsers = useSelector((state) => state.user.latestUsers);
  const latestUsersLoading = useSelector(
    (state) => state.user.latestUsersLoading
  );
  const allLatestCategories = useSelector(
    (state) => state.category.latestCategories
  );
  const latestCategoriesLoading = useSelector(
    (state) => state.category.latestCategoriesLoading
  );
  const latestProductsLoading = useSelector(
    (state) => state.product.latestProductsLoading
  );
  const allLatestProducts = useSelector(
    (state) => state.product.latestProducts
  );
  const [latestUsers, setLatestUsers] = useState(
    <Typography
      variant="h6"
      fontWeight={"bold"}
      textTransform={"uppercase"}
      align="center"
    >
      no users found
    </Typography>
  );

  const [latestCategories, setLatestCategories] = useState(
    <Typography
      variant="h6"
      fontWeight={"bold"}
      textTransform={"uppercase"}
      align="center"
    >
      no categories found
    </Typography>
  );
  const [latestProducts, setLatestProducts] = useState(
    <Typography
      variant="h6"
      fontWeight={"bold"}
      textTransform={"uppercase"}
      align="center"
    >
      no products found
    </Typography>
  );

  const totalWidgetsList = useMemo(() => {
    const list = [
      {
        name: "total users",
        num: totalUser,
        icon: <GroupIcon />,
        path: "/users",
      },
      {
        name: "total categories",
        num: totalCategories,
        icon: <CategoryIcon />,
        path: "/all-categories",
      },
      {
        name: "total products",
        num: totalProducts,
        icon: <ProductionQuantityLimitsIcon />,
        path: "/all-products",
      },
    ];
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          mb: "40px",
        }}
      >
        {list.map((e, i) => {
          return (
            <Box
              key={i}
              sx={{
                minWidth: "300px",
                flexGrow: 1,
                p: 1,
                bgcolor: "white",
                borderRadius: 5,
                boxShadow: "0px 0 20px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {e.name}
                </Typography>
                <Button
                  endIcon={<ArrowForwardIosIcon />}
                  variant="text"
                  onClick={() => navigate(e.path)}
                >
                  show all
                </Button>
              </Box>
              <Typography align="center" fontWeight={"bold"} variant="h4">
                {e.num}
              </Typography>
              <Icon>{e.icon}</Icon>
            </Box>
          );
        })}
      </Box>
    );
  }, [navigate, totalCategories, totalProducts, totalUser]);

  const singleUserRow = useCallback((row) => {
    return (
      <Accordion key={row.id}>
        <AccordionSummary>
          <Typography component="span">
            {row.full_name} #{row.id}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body2"
            fontWeight="bold"
            textTransform={"uppercase"}
            display={"inline"}
          >
            full_name:{" "}
          </Typography>
          {row.full_name}
          <br />
          <Typography
            variant="body2"
            fontWeight="bold"
            textTransform={"uppercase"}
            display={"inline"}
          >
            email:{" "}
          </Typography>
          {row.email}
        </AccordionDetails>
      </Accordion>
    );
  }, []);

  const singleCategoryRow = useCallback((row) => {
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
            category name:{" "}
          </Typography>
          {row.name}
          <br />
          <Typography
            variant="body2"
            fontWeight="bold"
            textTransform={"uppercase"}
            display={"inline"}
          >
            product count:{" "}
          </Typography>
          {row.products_count}
        </AccordionDetails>
      </Accordion>
    );
  }, []);

  const singleProductRow = useCallback((row) => {
    return (
      <Accordion key={row.id}>
        <AccordionSummary>
          <Typography component="span">
            {row.name} #{row.id}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ wordBreak: "break-word" }}>
          <Typography
            variant="body2"
            fontWeight="bold"
            textTransform={"uppercase"}
            display={"inline"}
          >
            category name:{" "}
          </Typography>
          {row.category.name}
          <br />
          <Typography
            variant="body2"
            fontWeight="bold"
            textTransform={"uppercase"}
            display={"inline"}
          >
            product info:{" "}
          </Typography>
          {row.info}
          <br />
          <img
            src={row.image}
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
        </AccordionDetails>
      </Accordion>
    );
  }, []);

  useEffect(() => {
    if (allLatestUsers.length > 0) {
      setLatestUsers(
        <div>{allLatestUsers.map((row) => singleUserRow(row))}</div>
      );
    } else {
      setLatestUsers(
        <Typography
          variant="h6"
          fontWeight={"bold"}
          textTransform={"uppercase"}
          align="center"
        >
          no users found
        </Typography>
      );
    }
  }, [allLatestUsers, allLatestUsers.length, singleUserRow]);

  useEffect(() => {
    if (allLatestCategories.length > 0) {
      setLatestCategories(
        <div>{allLatestCategories.map((row) => singleCategoryRow(row))}</div>
      );
    } else {
      setLatestCategories(
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
  }, [allLatestCategories, allLatestCategories.length, singleCategoryRow]);

  useEffect(() => {
    if (allLatestProducts.length > 0) {
      setLatestProducts(
        <div>{allLatestProducts.map((row) => singleProductRow(row))}</div>
      );
    } else {
      setLatestProducts(
        <Typography
          variant="h6"
          fontWeight={"bold"}
          textTransform={"uppercase"}
          align="center"
        >
          no products found
        </Typography>
      );
    }
  }, [allLatestProducts, allLatestProducts.length, singleProductRow]);

  return (
    <Main open={open} sx={{ overflow: "hidden" }}>
      <DrawerHeader />
      {totalWidgetsList}
      <Box sx={{ display: "flex", gap: "40px", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            latest users
          </Typography>
          {latestUsersLoading ? (
            <CircularProgress
              sx={{
                display: "flex",
                mx: "auto",
              }}
            />
          ) : (
            latestUsers
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            latest categories
          </Typography>
          {latestCategoriesLoading ? (
            <CircularProgress
              sx={{
                display: "flex",
                mx: "auto",
              }}
            />
          ) : (
            latestCategories
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            latest products
          </Typography>
          {latestProductsLoading ? (
            <CircularProgress
              sx={{
                display: "flex",
                mx: "auto",
              }}
            />
          ) : (
            latestProducts
          )}
        </Box>
      </Box>
    </Main>
  );
};

export default MainWidget;
