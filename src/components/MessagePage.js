import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const MessageCard = ({ id, title, description, onDelete, onRespond }) => (
  <Paper
    elevation={3}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 1,
      p: 2,
      mb: 2,
      position: "relative",
      borderRadius: 2,
    }}
  >
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body2">From: Study Group</Typography> {/* Standard Name */}
    <Typography variant="body2">{description}</Typography>
    <Button
      variant="contained"
      color="primary"
      sx={{ alignSelf: "flex-start" }}
      onClick={() => onRespond(id)} // Ensure this triggers the navigation with the message id
    >
      Respond
    </Button>
    <IconButton
      onClick={onDelete}
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
      }}
    >
      <CloseIcon />
    </IconButton>
  </Paper>
);

const MessagePage = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: 1,
      title: "CS3234 Study Group Invitation",
      description: "Meets every Wednesday at 3:30 PM",
    },
    {
      id: 2,
      title: "Chad has sent you a message request",
      description:
        "Hey, I see that you are in CS3543 with me. Message me we should study sometime.",
    },
    {
      id: 3,
      title: "ECE Group Chat Invitation",
      description: "43 Users, Last Message 13 Minutes Ago",
    },
  ]);

  const handleDelete = (id) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  const handleRespond = (id) => {
    navigate(`/response/${id}`);  // This will correctly navigate to /response/:id
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          id={message.id}
          title={message.title}
          description={message.description}
          onDelete={() => handleDelete(message.id)}
          onRespond={handleRespond} // Pass down the navigation handler
        />
      ))}
    </Box>
  );
};

export default MessagePage;

