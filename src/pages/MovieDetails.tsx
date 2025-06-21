import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/movieDetails.css';

type MovieDetails = {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
};

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type Trailer = {
  key: string;
  site: string;
  type: string;
};

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/movie/${id}`).then((res) => setMovie(res.data));
    api.get(`/movie/${id}/credits`).then((res) => setCast(res.data.cast.slice(0, 5)));
    api.get(`/movie/${id}/videos`).then((res) => {
      const video = res.data.results.find(
        (v: Trailer) => v.site === 'YouTube' && v.type === 'Trailer'
      );
      if (video) setTrailer(video);
    });
  }, [id]);

  if (!movie) return <div className="details-container">Carregando...</div>;

  return (

    <div className="details-container">
    <button
    onClick={() => navigate('/')}
    className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded hover:bg-yellow-500 transition mb-4"
    >Voltar
    </button>
      <div className="flex-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="poster-details"
        />
        <div className="details-content">
          <h1 className="title-details">{movie.title}</h1>
          <p className="overview">{movie.overview}</p>
          <p className="detail-label">🎬 Lançamento: {movie.release_date}</p>
          <p className="detail-label">⭐ Avaliação: {movie.vote_average}</p>
          <div className="detail-section">
          <div className="detail-section">
          <strong>🎭 Gêneros:</strong>
          <div className="genre-wrapper">
              {movie.genres.map((g) => (
              <span key={g.id} className="genre-badge">{g.name}</span>
              ))}
          </div>
          </div>
        </div>
          <div>
            <strong className="block mb-2">👥 Elenco Principal:</strong>
            <ul className="cast-list">
              {cast.map((actor) => (
                <li key={actor.id}>
                  {actor.name} como {actor.character}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="trailer-container">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
