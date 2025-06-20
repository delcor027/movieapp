import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/movie/now_playing').then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar filme..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="hover:opacity-80">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded shadow"
            />
            <p className="mt-2 text-center font-semibold">{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}