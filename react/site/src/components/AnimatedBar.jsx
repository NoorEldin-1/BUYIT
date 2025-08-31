import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

const text =
  "افضل طريقة للشراء بالتقسيط للاستفسار عن المنتجات تفضل التواصل على واتساب || The best way to buy in installments. For inquiries about products, please contact us on WhatsApp";

const AnimatedBar = ({ dir }) => {
  const element = useMemo(() => {
    return (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          overflow: "hidden",
          position: "relative",
          bgcolor: "primary.main",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "nowrap",
            fontWeight: "bold",
            animation: `slideIn 20s linear alternate-reverse infinite`,
            animationDirection: dir,
            color: "white",
          }}
        >
          {text}
        </Typography>

        <style>
          {`
            @keyframes slideIn {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}
        </style>
      </Box>
    );
  }, [dir]);

  return element;
};

export default AnimatedBar;
