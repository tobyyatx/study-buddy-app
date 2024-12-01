import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Typography, AppBar, Toolbar, Button } from "@mui/material";  // Removed Box since it's not used
import MatchingPage from "./components/MatchingPage";
import ResponsePage from "./components/ResponsePage";
import ProfilePage from "./components/ProfilePage";
import MessagePage from "./components/MessagePage";

// Update Navigation to include Profile, Matches, and Messages
function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Study Buddy App
          </Typography>
          <Button color="inherit" href="/profile">Profile</Button>
          <Button color="inherit" href="/matching">Matches</Button>
          <Button color="inherit" href="/messages">Messages</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        {/* Set Profile page as the default route */}
        <Route path="/" element={<ProfilePage />} /> {/* Profile page as home */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile page */}
        <Route path="/matching" element={<MatchingPage />} /> {/* Matches page */}
        <Route path="/messages" element={<MessagePage />} /> {/* Messages page */}
        <Route path="/response/:id" element={<ResponsePage />} /> {/* Response page */}
      </Routes>
    </Router>
  );
}

export default App;

