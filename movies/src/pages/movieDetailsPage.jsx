import React from "react"; 
import { useParams } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieCredits } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import MovieDetails from "../components/movieDetails/";
import MovieCast from "../components/movieCast/"; 
import PageTemplate from "../components/templateMoviePage";

const MoviePage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery({
    queryKey: ["movie", { id: id }],
    queryFn: getMovie,
  });

  const { data: credits, error: creditsError, isLoading: isCreditsLoading, isError: isCreditsError } = useQuery({
    queryKey: ["credits", { id: id }],
    queryFn: getMovieCredits,
  });

  if (isLoading || isCreditsLoading) {
    return <Spinner />;
  }

  if (isError || isCreditsError) {
    return <h1>{error ? error.message : creditsError.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <MovieCast cast={credits ? credits.cast : []} />
          </PageTemplate>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  );
};

export default MoviePage;
