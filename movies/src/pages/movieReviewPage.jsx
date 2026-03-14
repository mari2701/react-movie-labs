import React from "react";
import { useLocation } from "react-router";
import TemplateMoviePage from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;
  
  return (
    <TemplateMoviePage movie={movie}>
      <MovieReview review={review} />
    </TemplateMoviePage>
  );
};

export default MovieReviewPage;
