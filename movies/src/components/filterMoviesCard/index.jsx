import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";


const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

    const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  const displayGenres = [{ id: "0", name: "All" }, ...genres];

  const handleChange = (e, type, value) => {
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleYearChange = (e) => {
    handleChange(e, "year", e.target.value);
  };

  const years = [];
  for (let i = 2027; i >= 1950; i--) {
    years.push(i);
  }



  return (
    <Card 
      sx={{
        backgroundColor: "rgb(245, 154, 158)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
            <TextField
      sx={{...formControl}}
      id="filled-search"
      label="Search field"
      type="search"
      variant="filled"
      value={props.titleFilter}
      onChange={handleTextChange}
    />

        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
           <Select
    labelId="genre-label"
    id="genre-select"
    defaultValue=""
    value={props.genreFilter}
    onChange={handleGenreChange}
  >

            {displayGenres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="year-label">Release Year</InputLabel>
          <Select
            labelId="year-label"
            id="year-select"
            value={props.yearFilter}
            onChange={handleYearChange}
          >
            <MenuItem value="">All</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image="https://i.pinimg.com/1200x/a8/e0/e4/a8e0e49d0301f8812eb150cdc6bb95e8.jpg"
        title="Filter"
      />
      
      
    </Card>

  
)};