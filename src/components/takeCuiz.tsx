"use client";

import { Typography } from "@mui/material";

export default function TakeQuiz() {
  return (
    <Typography
      sx={{
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#544C4A ",
        textAlign: "center",
      }}
    >
      Answer questions carefully before moving to the next question,
      knowingfully that you cant go back to the previous question.
    </Typography>
  );
}
