import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllEvents } from "../store/eventsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setProductId } from "../store/productSlice";
import { changeDialog } from "../store/dialogSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (events.length > 0) {
      setAllEvents(
        events.map((event) => {
          return (
            <SwiperSlide key={event.id}>
              <img
                src={event.image}
                style={{ width: "100%", height: "100%" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                  color: "white",
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  textTransform="uppercase"
                  fontStyle="italic"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  {event.name.length > 20
                    ? event.name.slice(0, 20) + "..."
                    : event.name}
                </Typography>
                <Typography
                  variant="h6"
                  textTransform="uppercase"
                  fontStyle="italic"
                  fontWeight="bold"
                  sx={{ mb: 1, textDecoration: "underline" }}
                  color="primary"
                >
                  {event.price}EGP
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, maxWidth: "600px" }}>
                  {event.info.length > 100
                    ? event.info.slice(0, 100) + "..."
                    : event.info}
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddShoppingCartIcon />}
                  >
                    buyit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ color: "white", borderColor: "white" }}
                    onClick={() => {
                      dispatch(setProductId(event.id));
                      dispatch(changeDialog("product"));
                    }}
                  >
                    details
                  </Button>
                </Box>
              </Box>

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                }}
              ></div>
            </SwiperSlide>
          );
        })
      );
    }
  }, [dispatch, events]);

  return (
    <Swiper
      style={{ width: "100%", height: "400px" }}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      loop={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {allEvents}
    </Swiper>
  );
};

export default Events;
