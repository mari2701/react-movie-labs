import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../movieCard";
import Typography from "@mui/material/Typography";

const MovieRecommendations = ({ movies }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h5" component="h3" sx={{marginTop: 2}}>
          Recommended Movies
        </Typography>
      </Grid>
      {movies.map((m) => (
        <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <MovieCard movie={m} action={(movie) => null} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieRecommendations;