import React, { useContext } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from '../../contexts/moviesContext';

const AddToWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const handleAddToMustWatch = () => {
    context.addToMustWatch(movie);
  };
  return (
    <PlaylistAddIcon color="primary" onClick={handleAddToMustWatch} style={{ cursor: 'pointer' }} />
  );
};

export default AddToWatchListIcon;
