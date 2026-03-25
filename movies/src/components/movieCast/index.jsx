import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 10,
    margin: 2.5,
};
const chip = { margin: 0.5 ,};

const MovieCast = ({ cast }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <>
      <Typography variant="h5" component="h3" align="center">
        Cast
      </Typography>
      <Paper component="ul" sx={{...root}}>
        {cast.map((person) => (
          <li key={person.id}>
            <Chip
              avatar={
                <Avatar
                  alt={person.name}
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
                      : undefined
                  }
                />
              }
              label={person.name}
              sx={{...chip}}
            />
          </li>
        ))}
      </Paper>
    </>
  );
};

export default MovieCast;