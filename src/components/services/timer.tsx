"use client";
import { Typography } from "@mui/material";

import React, { useState, useEffect, useRef } from "react";
import { clearInterval } from "timers";

interface TimeProps {
  seconds: number;
  timerId: React.MutableRefObject<undefined>;
}

const Timer: React.FC<TimeProps> = ({ seconds }) => {
  const [countDown, setCountDown] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  const timerId: { current: string | number | NodeJS.Timeout | undefined } =
    useRef();

  // const timerId: React.MutableRefObject<undefined>
  // const timerId.current: number
  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountDown((prev: number) => prev + 1);
    }, 3000);
  }, []);
  return (
    <div>
      <Typography
        sx={{
          color: "#eee",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Timer: {countDown}
        {countDown === 10 && "game over"}
      </Typography>
    </div>
  );
};

export default Timer;
