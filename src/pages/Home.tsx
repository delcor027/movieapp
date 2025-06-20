import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/home.css';

// Tipos
interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

type FilterOption = 'popular' | 'top_rated' | 'now_playing' | 'release_date' | 'trending';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOption>('now_playing');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await api.get('/genre/movie/list');
        setGenres(data.genres);
      } catch (err) {
        console.error('Erro ao buscar gêneros:', err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [filter, selectedGenre]);

useEffect(() => {
  loadMovies();
}, [page, filter, selectedGenre]);


    const loadMovies = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    let endpoint = `/movie/${filter === 'release_date' ? 'now_playing' : filter}`;
    if (filter === 'trending') endpoint = '/trending/movie/day';

    // Se houver gênero selecionado, usar o endpoint /discover/movie
    if (selectedGenre !== null) {
        endpoint = '/discover/movie';
    }

    try {
        const { data } = await api.get(endpoint, {
        params: {
            page,
            with_genres: selectedGenre ?? undefined,
        },
        });

        const newMovies: Movie[] =
        filter === 'release_date'
            ? data.results.sort(
                (a: Movie, b: Movie) =>
                new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
            )
            : data.results;

        setMovies((prev) => [...prev, ...newMovies]);

        if (data.page >= data.total_pages || newMovies.length === 0) {
        setHasMore(false);
        }
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    } finally {
        setLoading(false);
    }
    };

    const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
    );

  const getGenreNames = (ids: number[]) => {
    return ids.map(id => genres.find(g => g.id === id)?.name).filter(Boolean).join(', ');
  };

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
          <option value="trending">🔥 Tendência Hoje</option>
        </select>

        <select
          className="home-select"
          value={selectedGenre ?? ''}
          onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Todos os Gêneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
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
              <p className="movie-genres">🎭 {getGenreNames(movie.genre_ids)}</p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition"
          >
            Ver mais
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center text-slate-400 mt-4">Carregando mais filmes...</div>
      )}
    </div>
  );
}