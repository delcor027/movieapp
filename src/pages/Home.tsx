import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/home.css';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

type FilterOption = 'popular' | 'top_rated' | 'now_playing' | 'release_date';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOption>('now_playing');

  useEffect(() => {
    const fetchMovies = async () => {
      const endpoint = filter === 'release_date' ? 'now_playing' : filter;
      const { data } = await api.get(`/movie/${endpoint}`);
      const result = filter === 'release_date'
        ? data.results.sort((a: Movie, b: Movie) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
        : data.results;
      setMovies(result);
    };
    fetchMovies();
  }, [filter]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1 className="home-title">🎬 Filmes em Cartaz</h1>

      <div className="home-controls">
        <input
          type="text"
          placeholder="Buscar filme..."
          className="home-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="home-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterOption)}
        >
          <option value="now_playing">Em Cartaz</option>
          <option value="popular">Mais Populares</option>
          <option value="top_rated">Melhores Avaliados</option>
          <option value="release_date">Mais Recentes</option>
        </select>
      </div>

      <div className="home-grid">
        {filteredMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <p className="movie-title">{movie.title}</p>
              <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>
              <p className="movie-date">{movie.release_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}