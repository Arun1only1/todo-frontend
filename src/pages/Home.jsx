import { Typography } from "@mui/material";
import React from "react";

const Home = () => {
  const userName = localStorage.getItem("firstName");
  return (
    <div>
      <Typography> Welcome {userName}</Typography>
    </div>
  );
};

export default Home;
