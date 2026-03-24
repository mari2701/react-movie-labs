import React, { useEffect, useState } from "react"; 
import { useParams } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieImages } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import MovieHeader from "../components/headerMovie/";
import MovieDetails from "../components/movieDetails/";
import MovieCast from "../components/movieCast/"; 
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const MoviePage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery({
    queryKey: ["movie", { id: id }],
    queryFn: getMovie,
  });

  const { data: imagesData, isLoading: isImagesLoading, isError: isImagesError, error: imagesError } = useQuery({
    queryKey: ["images", { id: id }],
    queryFn: getMovieImages,
  });

  const [cast, setCast] = useState([]); // ✅ NEW: state for cast

  // ✅ NEW: fetch cast data from TMDb API
  useEffect(() => {
    if (!movie) return;

    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCast(data.cast || []))
      .catch((err) => console.error(err));
  }, [movie]);

  if (isLoading || isImagesLoading) {
    return <Spinner />;
  }

  if (isError || isImagesError) {
    return <h1>{error ? error.message : imagesError.message}</h1>;
  }

  const images = imagesData.posters.map((poster) => poster.file_path);

  return (
    <>
      {movie ? (
        <>
          <MovieHeader movie={movie} />
          <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid item xs={3}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <ImageList sx={{ height: "100vh" }} cols={1}>
                  {images.map((image) => (
                    <ImageListItem key={image} cols={1}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${image}`}
                        alt={image}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </Grid>
            <Grid item xs={9}>
              <MovieDetails movie={movie} />
              <MovieCast cast={cast} /> {/* ✅ NEW: display cast below movie details */}
            </Grid>
          </Grid>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  );
};

export default MoviePage;
