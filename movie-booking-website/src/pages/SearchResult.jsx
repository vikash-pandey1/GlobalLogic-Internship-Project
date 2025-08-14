import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import movies from '../data/nowMovies';
import upmovies from '../data/upcomingMovies';
import './SearchResult.css';

// const SearchResults = () => {
//   const navigate = useNavigate();
//   const { search } = useLocation();
//   const query = new URLSearchParams(search).get('query')?.toLowerCase() || '';

//   const allMovies = [...movies, ...upmovies];
//   const filtered = allMovies.filter((movie) =>
//     movie.title.toLowerCase().includes(query)
//   );

//   return (
//     <div className="search-results">
//       <h2>Search Results for "{query}"</h2>

//       {filtered.length === 0 ? (
//         <p>No movies found.</p>
//       ) : (
//         <div className="movies-grid">
//           {filtered.map((movie) => (
//             <div key={movie.id} className="movie-card" onClick={() => navigate(`/booking/${movie.type}/${movie.id}`)}>
//               <img src={movie.poster} alt={movie.title} />
//               <h4>{movie.title}</h4>
//               <p>{movie.genre.join(' ● ')}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

const SearchResults = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query')?.toLowerCase() || '';

  const allMovies = [
    ...movies.map(m => ({ ...m, type: 'nowplaying' })),
    ...upmovies.map(m => ({ ...m, type: 'comingsoon' }))
  ];

  const filtered = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(query)
  );

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>

      {filtered.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="movies-grid">
          {filtered.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/booking/${movie.type}/${movie.id}`)}
            >
              <img src={movie.poster} alt={movie.title} />
              <h4>{movie.title}</h4>
              <p>{movie.genre.join(' ● ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default SearchResults;
