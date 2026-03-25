import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";




export default function MovieCard({ movie, action }) {
    const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const voteAverage =  movie.vote_average.toFixed(1);

  return (
    <Card>
            <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          
          <Typography variant="h5" component="p"
            sx={{
              color: '#3a1212',
              fontWeight: 'bold',
              width: 220,
              textAlign: 'center',
              
            }}
          >
            {movie.title}{" "}
          </Typography>
        }
      />

      <CardMedia
        sx={{ height: 350, width: 250
          , alignContent: "center"
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{xs: 5}}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{xs: 5}}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {voteAverage}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
                 <CardActions disableSpacing>
      
        {action(movie)}
      
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" sx={{ color: '#7a4530' }}>
            more info
          </Button>
        </Link>
        
      </CardActions>
    </Card>
  );
}
