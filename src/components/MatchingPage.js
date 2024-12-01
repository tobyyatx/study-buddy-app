import React, { useState, useEffect } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

// Sample data for potential study partners
const sampleProfiles = [
  {
    id: 1,
    username: "Alice",
    courses: ["Algorithms", "Database Systems"],
    studyTimes: ["Morning", "Afternoon"],
    demographics: "North America",  // Added demographics
    profilePicture: "/default-profile.png",
  },
  {
    id: 2,
    username: "Bob",
    courses: ["Linear Algebra", "Calculus"],
    studyTimes: ["Afternoon", "Evening"],
    demographics: "Europe",  // Added demographics
    profilePicture: "/default-profile.png",
  },
  {
    id: 3,
    username: "Charlie",
    courses: ["Data Structures", "Algorithms"],
    studyTimes: ["Morning", "Evening"],
    demographics: "North America",  // Added demographics
    profilePicture: "/default-profile.png",
  },
  {
    id: 4,
    username: "David",
    courses: ["Machine Learning", "Linear Algebra"],
    studyTimes: ["Afternoon", "Morning"],
    demographics: "Asia",  // Added demographics
    profilePicture: "/default-profile.png",
  },
  {
    id: 5,
    username: "Eve",
    courses: ["Discrete Math", "Algorithms"],
    studyTimes: ["Evening", "Night"],
    demographics: "South America",  // Added demographics
    profilePicture: "/default-profile.png",
  },
];

const MatchingPage = () => {
  const [matchedProfiles, setMatchedProfiles] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userProfile"));

    const matches = sampleProfiles.filter((profile) => {
      const commonCourses = profile.courses.filter((course) =>
        currentUser.courses.includes(course)
      );
      const commonStudyTimes = profile.studyTimes.filter((time) =>
        currentUser.studyTimes.includes(time)
      );
      const isDemographicMatch = profile.demographics === currentUser.demographics;  // Matching based on demographics

      return commonCourses.length > 0 && commonStudyTimes.length > 0 && isDemographicMatch;
    });

    setMatchedProfiles(matches);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Study Partner Matches
      </Typography>
      <List>
        {matchedProfiles.length > 0 ? (
          matchedProfiles.map((profile) => (
            <ListItem key={profile.id}>
              <Avatar sx={{ width: 50, height: 50, mr: 2 }} src={profile.profilePicture} />
              <ListItemText
                primary={profile.username}
                secondary={`${profile.courses.join(", ")} - Study Times: ${profile.studyTimes.join(", ")} - Demographics: ${profile.demographics}`}  // Displaying demographics
              />
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/response/${profile.id}`}
              >
                Message
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography>No matches found</Typography>
        )}
      </List>
    </Box>
  );
};

export default MatchingPage;
