import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import $axios from "../lib/axios.instance";

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTodoList = async () => {
      try {
        setIsLoading(true);
        const response = await $axios.post("/todo/list", {
          page: 1,
          limit: 10,
        });

        setIsLoading(false);
        setTodoList(response?.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error?.response?.data?.message);
      }
    };

    getTodoList();
  }, []);

  const userName = localStorage.getItem("firstName");

  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <Grid
      container
      sx={{
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {todoList.map((item) => {
        return (
          <Grid
            xs={8}
            sm={6}
            lg={4}
            item
            key={item._id}
            sx={{
              borderRadius: "10px",
              mb: "2rem",
              padding: "2rem",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          >
            <Typography variant="h5" sx={{ color: "green" }}>
              {item?.title}
            </Typography>
            <Typography>{item?.description}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Home;
