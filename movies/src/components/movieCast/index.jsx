import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const MovieCast = ({ cast }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mt: 4 }}>
        Cast
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {cast.map((person) => (
          <Grid item key={person.id} xs={6} sm={4} md={2}>
            <Avatar
              alt={person.name}
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
                  : undefined
              }
              sx={{ width: 120, height: 120, mb: 1 }}
            />
            <Typography variant="body2" align="center">
              {person.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MovieCast;