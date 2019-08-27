import React, {useEffect,useState} from 'react';
import './App.css';

import { instance, URL_WITH_KEY } from './services/movieService';

const Movie = ({movie}) => {
  const handleMovieClick = (event) => {
    console.log(event.currentTarget.getAttribute('data-id'));
  }
  return (
    <p data-id={movie.imdbID} onClick={handleMovieClick}>
      {movie.Title}
      {movie.Poster}
      {movie.Type}
      {movie.Year}
      {movie.imdbID}
    </p>
  )
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('klan'); //TODO remove defalut value afeter coding
  const [loading, setLoading] = useState(false);

  useEffect(() => {


    const fetchMovies = async (movieTitle) => {
      try {
        setLoading(true);
        let response = await instance.get(`${URL_WITH_KEY}&s=${movieTitle}`);
        setMovies(response.data.Search);
        //if data not exist => error
        //if Search not exist => error
        //axios takes care about 30x, 40x => error
        console.log(response.data.Search);
      } catch(error)  {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies(filter);
  }, [filter])

  const handleFilterMovies = (event) => {
    console.log(event.currentTarget.value);
    setFilter(event.currentTarget.value);
  }
  return (
    <div className="App">
      <input type="search" onChange={handleFilterMovies} />
      {loading && <p>loading - please wait</p>}
      {(!loading && movies) && movies.map((movie, key)=><Movie key={key} movie={movie} />)}
    </div>
  );
}

export default App;
