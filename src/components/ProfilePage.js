import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Paper,
  Avatar,
} from "@mui/material";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    major: "",
    courses: [],
    subjects: [],
    studyTimes: [],
    demographics: "",
    studyHabits: "",
    profilePicture: "", // Add profilePicture to the state
  });

  const availableCourses = [
    "Data Structures",
    "Algorithms",
    "Database Systems",
    "Operating Systems",
    "Linear Algebra",
    "Calculus",
  ];

  const availableSubjects = [
    "Math",
    "Computer Science",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
  ];

  const availableStudyTimes = ["Morning", "Afternoon", "Evening"];

  const availableDemographics = ["North America", "South America", "Europe", "Asia", "Africa", "Australia", "Antarctica"];
  const availableStudyHabits = ["Discussion-based", "Solo Study", "Group Study"];

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    alert("Profile saved!");
    console.log("User Profile:", profile);

    // Get all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

    // Check if the current user already exists in the list
    const userIndex = allUsers.findIndex((user) => user.email === profile.email);

    if (userIndex !== -1) {
      // Update existing user profile
      allUsers[userIndex] = profile;
    } else {
      // Add new user to the list
      allUsers.push(profile);
    }

    // Save updated list of users back to localStorage
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        {/* Profile Picture */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            sx={{ width: 100, height: 100, mb: 2 }}
            src={profile.profilePicture || "/default-profile.png"} // Show uploaded picture or default image
          />
          <Button
            variant="contained"
            component="label"
            color="secondary"
            sx={{ mb: 2 }}
          >
            Upload Profile Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        {/* Username */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={profile.username}
          onChange={(e) => handleChange("username", e.target.value)}
          margin="normal"
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={profile.email}
          onChange={(e) => handleChange("email", e.target.value)}
          margin="normal"
        />

        {/* Academic Major */}
        <TextField
          fullWidth
          label="Academic Major"
          variant="outlined"
          value={profile.major}
          onChange={(e) => handleChange("major", e.target.value)}
          margin="normal"
        />

        {/* Current Courses */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Current Courses</InputLabel>
          <Select
            multiple
            value={profile.courses}
            onChange={(e) => handleChange("courses", e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {availableCourses.map((course) => (
              <MenuItem key={course} value={course}>
                <Checkbox checked={profile.courses.includes(course)} />
                <ListItemText primary={course} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Subjects Seeking Study Partners */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Subjects for Study Partners</InputLabel>
          <Select
            multiple
            value={profile.subjects}
            onChange={(e) => handleChange("subjects", e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {availableSubjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                <Checkbox checked={profile.subjects.includes(subject)} />
                <ListItemText primary={subject} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Study Times */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Preferred Study Times</InputLabel>
          <Select
            multiple
            value={profile.studyTimes}
            onChange={(e) => handleChange("studyTimes", e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {availableStudyTimes.map((time) => (
              <MenuItem key={time} value={time}>
                <Checkbox checked={profile.studyTimes.includes(time)} />
                <ListItemText primary={time} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Demographics */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Demographics</InputLabel>
          <Select
            value={profile.demographics}
            onChange={(e) => handleChange("demographics", e.target.value)}
          >
            {availableDemographics.map((demographic) => (
              <MenuItem key={demographic} value={demographic}>
                {demographic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Study Habits */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Study Habits</InputLabel>
          <Select
            value={profile.studyHabits}
            onChange={(e) => handleChange("studyHabits", e.target.value)}
          >
            {availableStudyHabits.map((habit) => (
              <MenuItem key={habit} value={habit}>
                {habit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save Profile
        </Button>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Profile Preview
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={profile.profilePicture || "/default-profile.png"}
          />
        </Box>
        <Typography variant="body1">
          <strong>Username:</strong> {profile.username || "Not specified"}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {profile.email || "Not specified"}
        </Typography>
        <Typography variant="body1">
          <strong>Major:</strong> {profile.major || "Not specified"}
        </Typography>
        <Typography variant="body1">
          <strong>Current Courses:</strong>{" "}
          {profile.courses.length > 0 ? profile.courses.join(", ") : "Not specified"}
        </Typography>
        <Typography variant="body1">
          <strong>Subjects Seeking Study Partners:</strong>{" "}
          {profile.subjects.length > 0 ? profile.subjects.join(", ") : "Not specified"}
        </Typography>
        <Typography variant="body1">
          <strong>Preferred Study Times:</strong>{" "}
          {profile.studyTimes.length > 0 ? profile.studyTimes.join(", ") : "Not specified"}
        </Typography>
        <Typography variant="body1">
          <strong>Demographics:</strong> {profile.demographics || "Not specified"}
        </Typography>
        <Typography variant="body1">
          <strong>Study Habits:</strong> {profile.studyHabits || "Not specified"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ProfilePage; 
