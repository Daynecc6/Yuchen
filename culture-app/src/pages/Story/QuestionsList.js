import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Chip } from "@mui/material";

const QuestionsList = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultText, setResultText] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsSubmitted(true);
    const selectedQuestion = questions[currentQuestionIndex];
    if (selectedQuestion.answer === selectedAnswer) {
      setResultText("Correct!");
      setShowExplanation(false);
      setScore(score + 1);
    } else {
      setResultText("Incorrect!");
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setResultText("");
    setShowExplanation(false);
  };

  const handleFinish = () => {
    handleSubmit();
    setShowScore(true);
  };

  return (
    <Box
      my={2}
      p={2}
      sx={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
      }}
    >
      <Box mb={1}>
        <Typography variant="h6" gutterBottom>
          {currentQuestion.question_text}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
          {currentQuestion.choices.map((choice, index) => (
            <FormControlLabel
              key={index}
              value={choice}
              control={<Radio />}
              label={`${String.fromCharCode(index + 65)}. ${choice}`}
            />
          ))}
        </RadioGroup>
        {isSubmitted && (
          <Box my={2}>
            <Chip
              label={resultText}
              color={resultText === "Correct!" ? "success" : "error"}
            />
            {showExplanation && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Explanation: {currentQuestion.explanation}
              </Typography>
            )}
          </Box>
        )}
        <Box textAlign="center">
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              variant="contained"
              type="submit"
              disabled={!selectedAnswer}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={!selectedAnswer || showScore}
              onClick={handleFinish}
            >
              Finish
            </Button>
          )}
          {currentQuestionIndex < questions.length - 1 && (
            <Button
              variant="contained"
              disabled={!isSubmitted || !selectedAnswer}
              onClick={handleNextQuestion}
              sx={{ ml: 2 }}
            >
              Next
            </Button>
          )}
        </Box>
        {showScore && (
          <Box my={2}>
            <Typography variant="h6">
              Your final score is {score}/{questions.length}
            </Typography>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default QuestionsList;
