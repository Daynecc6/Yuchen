import { useState } from "react";

export const useStoryUploadForm = () => {
  const [formData, setFormData] = useState({
    country: "",
    purpose: "",
    theme: "",
    subtheme: "",
    title: "",
    scenario: "",
    freeresp: "",
    conversations: [],
    questions: [],
    // Add other fields as needed
  });

  const [currentConversation, setCurrentConversation] = useState({
    speaker: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleConversationChange = (event) => {
    setCurrentConversation({
      ...currentConversation,
      [event.target.name]: event.target.value,
    });
  };

  const addConversation = () => {
    if (currentConversation.speaker && currentConversation.message) {
      setFormData({
        ...formData,
        conversations: [...formData.conversations, currentConversation],
      });
      setCurrentConversation({ speaker: "", message: "" });
    }
  };

  const deleteConversation = (index) => {
    setFormData({
      ...formData,
      conversations: formData.conversations.filter((_, i) => i !== index),
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const newConversations = [...formData.conversations];
    const [removed] = newConversations.splice(source.index, 1);
    newConversations.splice(destination.index, 0, removed);
    setFormData({ ...formData, conversations: newConversations });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send the form data to your backend API
    const response = await fetch("/api/stories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Story uploaded successfully!");
    } else {
      alert("Error uploading the story.");
    }
  };

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    choices: [""],
    answer: "",
  });

  const handleQuestionChange = (event) => {
    setCurrentQuestion({
      ...currentQuestion,
      [event.target.name]: event.target.value,
    });
  };

  const handleChoiceChange = (event, index) => {
    const newChoices = [...currentQuestion.choices];
    newChoices[index] = event.target.value;
    setCurrentQuestion({ ...currentQuestion, choices: newChoices });
  };

  const handleAnswerChange = (event) => {
    setCurrentQuestion({ ...currentQuestion, answer: event.target.value });
  };

  const addQuestion = () => {
    if (
      currentQuestion.question &&
      currentQuestion.choices.every((choice) => choice) &&
      currentQuestion.answer
    ) {
      setFormData({
        ...formData,
        questions: [...formData.questions, currentQuestion],
      });
      setCurrentQuestion({
        question: "",
        choices: [""],
        answer: "",
      });
    }
  };

  const addChoice = () => {
    setCurrentQuestion({
      ...currentQuestion,
      choices: [...currentQuestion.choices, ""],
    });
  };

  const deleteQuestion = (index) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
  };

  return {
    formData,
    handleChange,
    currentConversation,
    handleConversationChange,
    addConversation,
    deleteConversation,
    onDragEnd,
    handleSubmit,
    currentQuestion,
    handleQuestionChange,
    handleChoiceChange,
    handleAnswerChange,
    addQuestion,
    addChoice,
    deleteQuestion,
  };
};
