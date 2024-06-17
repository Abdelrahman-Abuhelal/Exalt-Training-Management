import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputLabel from '@mui/material/InputLabel';

const AdminForm = () => {
  const baseUrl = import.meta.env.VITE_PORT_URL;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: []
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { question: "", type: "text", options: [] }
      ]
    });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(questionIndex, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push("");
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const reviewCreationAPI = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/reviews/create-review`,
        JSON.stringify(formData),
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        const reviewMessage = response.data;
        console.log(reviewMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    reviewCreationAPI();
    setFormData({
      title: "",
      description: "",
      questions: []
    });
  };

  const renderOptions = (questionIndex) => {
    return formData.questions[questionIndex].options.map(
      (option, optionIndex) => (
        <div key={optionIndex}>
          <TextField
            label={`Option ${optionIndex + 1}`}
            value={option}
            onChange={(e) =>
              handleOptionChange(questionIndex, optionIndex, e)
            }
            sx={{ marginBottom: 2, width: "60%" }}
          />
          <IconButton
            onClick={() => handleRemoveOption(questionIndex, optionIndex)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <Paper elevation={3} style={{ width: "70%", maxWidth: 1000, padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          Review Form Creation
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("title", { required: true })}
            label="Review Title"
            error={!!errors.title}
            helperText={errors.title?.message || ""}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
            fullWidth
          />
          <TextField
            {...register("description", { required: true })}
            label="Description"
            error={!!errors.description}
            helperText={errors.description?.message || ""}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
            fullWidth
          />
          {formData.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <TextField
                label={`Question ${questionIndex + 1}`}
                value={question.question}
                onChange={(e) => {
                  const updatedQuestions = [...formData.questions];
                  updatedQuestions[questionIndex].question = e.target.value;
                  setFormData({ ...formData, questions: updatedQuestions });
                }}
                sx={{ marginBottom: 2, width: "100%" }}
              />
              <FormControl sx={{ marginBottom: 2, width: "100%" }}>
                <InputLabel id={`question-type-label-${questionIndex}`}>
                  Type of Question
                </InputLabel>
                <Select
                  labelId={`question-type-label-${questionIndex}`}
                  id={`question-type-${questionIndex}`}
                  label="Type of Question"
                  value={question.type}
                  onChange={(e) => {
                    const updatedQuestions = [...formData.questions];
                    updatedQuestions[questionIndex].type = e.target.value;
                    setFormData({ ...formData, questions: updatedQuestions });
                  }}
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="one-answer-selection">
                    One Answer Selection
                  </MenuItem>
                  <MenuItem value="multiple-answer-selection">
                    Multiple Answer Selection
                  </MenuItem>
                </Select>
              </FormControl>
              {question.type !== "text" && renderOptions(questionIndex)}
              {question.type !== "text" && (
                <Button onClick={() => handleAddOption(questionIndex)}>
                  Add Option
                </Button>
              )}
              <IconButton
                onClick={() => handleRemoveQuestion(questionIndex)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button onClick={handleAddQuestion} variant="outlined" sx={{ mt: 2 }}>
            Add Question
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={errors.length > 0}
            sx={{ mt: 2, ml: 2 }}
          >
            Create Form
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default AdminForm;
