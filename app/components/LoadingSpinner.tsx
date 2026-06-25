import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingSpinner(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "150px",
        width: "100%",
      }}
    >
      <CircularProgress color="primary" size={50} />
    </Box>
  );
}
