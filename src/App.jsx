import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

// Define API endpoint
const API_URL = "https://www.omdbapi.com?apikey=b92d9c5e";

// Main component for the app
const App = () => {
  // Use the useState hook to create state variables for 'movies' and 'searchTerm'
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch movies from the API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search); // Update the 'movies' state variable with the search results
  };

  // Use the useEffect hook to fetch movies when the component is first rendered
  useEffect(() => {
    searchMovies(`Happy`);
  }, []);

  // Handler function for form submission
  // new onSubmit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the page from reloading
    searchMovies(searchTerm); // Perform a search with the current 'searchTerm'
  };

  return (
    // Render the app
    <div className="app">
      <h1>MovieLand</h1>

      <form className="search" onSubmit={handleSubmit}>
        {/* An input field for entering search terms. 
        It's value is bound to the 'searchTerm' state variable, 
        and it updates that variable when changed. */}
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* An image that acts as a search button, triggering a search when clicked */}
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </form>

      {/* Conditionally render either the movie results or a 'No movies found' message */}
      {movies?.length > 0 ? (
        <div className="container">
          {/* For each movie in 'movies', render a 'MovieCard' */}
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

// Export the component so it can be imported elsewhere
export default App;
