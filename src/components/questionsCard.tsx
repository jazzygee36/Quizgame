import { Box, Typography, Button } from "@mui/material";
import { AnswerObject } from "../pages/index";
import React from "react";
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionsCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <Box>
    <Typography
      sx={{
        fontWeight: "bold",
        fontFamily: "Righteous",
        marginBottom: "20px",
      }}
    >
      Question: {questionNr} / {totalQuestions}
    </Typography>
    <Typography
      sx={{
        fontWeight: "bold",
        fontFamily: "Righteous",
        marginBottom: "20px",
      }}
      dangerouslySetInnerHTML={{ __html: question }}
    ></Typography>

    {answers.map((answer) => (
      <Box
        key={answer}
        sx={{
          fontWeight: "bold",
          fontFamily: "Righteous",
        }}
        // correct={userAnswer?.correctAnswer === answer}
        //   userClicked={userAnswer?.answer === answer}
      >
        <Button
          value={answer}
          onClick={callback}
          disabled={!!userAnswer}
          sx={{
            fontWeight: "bold",
            fontFamily: "Righteous",
            background: "#00bfff",
            color: "#ffffff",
            marginY: "5px",
            // #87CEEB
            "&:hover": {
              background: " green",
            },
          }}
        >
          <span
            style={{ fontWeight: "bold" }}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </Button>
      </Box>
    ))}
  </Box>
);

export default QuestionsCard;
