import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SortIcon from "@mui/icons-material/Sort";

function MovieListPageTemplate({ movies, title, action, yearFilterProp, setYearFilterProp }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("");
  const [sortOption, setSortOption] = useState("popularity.desc");
  const genreId = Number(genreFilter);

  const displayedYear = yearFilterProp !== undefined ? yearFilterProp : yearFilter;
  const setDisplayedYear = setYearFilterProp || setYearFilter;

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return displayedYear.length > 0 ? (m.release_date || "").includes(displayedYear) : true;
    })
    .sort((a, b) => {
      if (sortOption === "popularity.asc") {
        return a.popularity - b.popularity;
      } else {
        return b.popularity - a.popularity;
      }
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "year") setDisplayedYear(value);
    else setGenreFilter(value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            yearFilter={displayedYear}
          />
          <Card sx={{marginTop: 2}}>
            <CardContent>
              <Typography variant="h5" component="h1">
                <SortIcon fontSize="large" />
                Sort results by
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={sortOption}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
                  <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
                  <MenuItem value="rating.desc">Rating Descending</MenuItem>
                  <MenuItem value="rating.asc">Rating Ascending</MenuItem>
                  <MenuItem value="release_date.desc">Release Date Descending</MenuItem>
                  <MenuItem value="release_date.asc">Release Date Ascending</MenuItem>
                  <MenuItem value="title.desc">Title Descending</MenuItem>
                  <MenuItem value="title.asc">Title Ascending</MenuItem>
                  
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>

      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
