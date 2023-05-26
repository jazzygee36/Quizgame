"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Container, Typography, Button, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/themeProvider";
import QuestionsCard from "@/components/questionsCard";
import { fetchQuizQuestion } from "@/components/api/api";
import { QuestionState, Difficulty } from "@/components/api/api";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;
// console.log(fetchQuizQuestion(TOTAL_QUESTIONS, Difficulty.EASY));

export default function Home(targetDate: string | number | Date) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  // const [timer, setTimer] = useState(60);

  // useEffect(() => {
  //   setInterval(() => {
  //     setTimer((prev) => prev - 1);
  //     if (timer === 0) {
  //       setTimer(timer);
  //     }
  //   }, 1000);
  // });

  const startTrivia = async () => {
    try {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestion(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (err) {
      return { message: "an error " };
    }
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (!gameOver) {
        const answer = e.currentTarget.value;
        const correct = questions[number].correct_answer === answer;
        if (correct) setScore((prev) => prev + 1);
        const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer,
        };
        setUserAnswers((prev) => [...prev, answerObject]);
      }
    } catch (error) {
      return { message: "there was an error loading this page" };
    }
  };
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: "bold",
              marginBottom: "20px",
              marginTop: "20px",
              fontFamily: "Righteous",
            }}
            color={
              gameOver || userAnswers.length === TOTAL_QUESTIONS
                ? "#000"
                : "#544C4A"
            }
          >
            Take QUIZ
          </Typography>

          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <>
              <Button
                color="primary"
                sx={{
                  background: "#0000FF",
                  width: "100px",
                  "&:hover": {
                    background: "green",
                  },
                }}
                onClick={startTrivia}
              >
                Start
              </Button>
            </>
          ) : null}

          {loading && (
            <Typography
              sx={{
                color: "#ff9191",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Loading...
            </Typography>
          )}

          {!loading && !gameOver && (
            <>
              {/* <Typography
                sx={{ 
                  color: "#eee",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                Timer: {Timer}
              </Typography> */}
              {/* <Timer /> */}
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                  paddingX: "30px",
                  paddingY: "30px",
                  marginTop: "50px",
                }}
              >
                {!gameOver && userAnswers.length === TOTAL_QUESTIONS ? (
                  <>
                    <Typography
                      sx={{
                        color: "green",
                        fontSize: "20px",
                        fontWeight: "bold",

                        fontFamily: "Righteous",
                      }}
                    >
                      {score <= 5 ? (
                        <>
                          <Typography sx={{ color: "red" }}>Failed!</Typography>
                          <Typography sx={{ color: "blue" }}>
                            Score too low
                          </Typography>
                        </>
                      ) : (
                        "CONGRATULATIONS!!!"
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        // color: "#eee",
                        fontFamily: "Righteous",
                      }}
                    >
                      You score : {score} / 10 questions
                    </Typography>
                  </>
                ) : (
                  <QuestionsCard
                    questionNr={number + 1}
                    totalQuestions={TOTAL_QUESTIONS}
                    question={questions[number].question}
                    answers={questions[number].answers}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    callback={checkAnswer}
                  />
                )}
              </Paper>
            </>
          )}

          {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 ? (
            <Button
              variant="contained"
              onClick={nextQuestion}
              sx={{
                marginTop: "20px",
                background: "green",
                fontWeight: "bold",
                color: "#eee",
                "&:hover": {
                  background: "#00bfff",
                },
              }}
            >
              Next Question
            </Button>
          ) : null}
        </Container>
      </ThemeProvider>
    </>
  );
}
