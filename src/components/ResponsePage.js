import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";

// Sample data for reference
const sampleProfiles = [
  {
    id: 1,
    username: "Alice",
    courses: ["Algorithms", "Database Systems"],
    studyTimes: ["Morning", "Afternoon"],
    profilePicture: "/default-profile.png",
  },
  {
    id: 2,
    username: "Bob",
    courses: ["Linear Algebra", "Calculus"],
    studyTimes: ["Afternoon", "Evening"],
    profilePicture: "/default-profile.png",
  },
  // Add more profiles if needed
];

// Simulated response logic
const generateResponse = (userInput, context) => {
  const input = userInput.toLowerCase();

  if (context === "subject") {
    if (input.includes("math")) {
      return "Math, nice! What kind of math are you studying? Algebra, Calculus, or something else?";
    } else if (input.includes("computer science") || input.includes("cs")) {
      return "Computer Science, awesome! What specific area are you focusing on? Programming, algorithms, or something else?";
    } else if (input.includes("science")) {
      return "Great! Are you focusing on physics, chemistry, biology, or something else?";
    } else if (input.includes("english")) {
      return "English is great! Are you working on literature, writing, or something else?";
    } else {
      return "That sounds interesting! What else can you tell me about your studies?";
    }
  }

  if (context === "location") {
    return "Where do you want to study? A library, cafe, or online?";
  }

  if (context === "studyConfirmation") {
    return "Got it! See you there!";
  }

  if (context === "goodbye") {
    return "Take care! Let me know if you need any more help!";
  }

  return "I'm not sure what you're asking, but I can help with study topics!";
};

const ResponsePage = () => {
  const { id } = useParams();
  const [userMessages, setUserMessages] = useState([
    { text: "Hi! What subject are you studying?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [context, setContext] = useState("subject");

  // Find the user profile by ID
  const currentUserProfile = sampleProfiles.find((profile) => profile.id === parseInt(id));

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setUserMessages([...userMessages, { text: userInput, sender: "user" }]);

    const botResponse = generateResponse(userInput, context);

    setUserMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, sender: "bot" },
    ]);

    if (context === "subject") {
      setContext("location");
    } else if (context === "location") {
      setContext("studyConfirmation");
    } else if (context === "studyConfirmation") {
      setContext("goodbye");
    }

    setUserInput("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chat with {"Study Buddy"}
      </Typography>
      <Box sx={{ maxHeight: 400, overflowY: "auto", mb: 2 }}>
        {userMessages.map((msg, index) => (
          <Paper
            key={index}
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: msg.sender === "user" ? "#d1e7ff" : "#f1f1f1",
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
          </Paper>
        ))}
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            fullWidth
            label="Type your message"
            variant="outlined"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSendMessage}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResponsePage;
