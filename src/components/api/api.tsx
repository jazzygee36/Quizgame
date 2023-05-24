import { shuffleArray } from "../services/shuffleArray";
export type Question = {
  categoty: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
export const fetchQuizQuestion = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endPoint = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  );
  const data = await endPoint.json();
  //   console.log(data.results);
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
