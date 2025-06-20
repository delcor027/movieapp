import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

type MovieDetails = {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
};

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    api.get(`/movie/${id}`).then((response) => {
      setMovie(response.data);
    });
  }, [id]);

  if (!movie) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="mb-4 rounded shadow"
      />
      <p className="mb-2">{movie.overview}</p>
      <p className="text-sm text-gray-500">Lançamento: {movie.release_date}</p>
    </div>
  );
}