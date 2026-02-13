import { useEffect, useState } from "react";
import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import tmdb from "../utils/tmdb";

const Movies = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        tmdb.baseUrl + tmdb.endpoints.popular
      );
      const data = await res.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <BlurCircle top="0" right="80px" />
      <BlurCircle bottom="50" left="80px" />

      <div className="px-6 md:px-16 lg:px-24 xl:px-44 pt-28 pb-20">
        <div className="relative flex items-center justify-between pb-10">
          <p className="text-gray-300 font-medium text-xl">
            Movies Now Playing
          </p>
        </div>
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            xl:grid-cols-5 gap-6 justify-items-center
          ">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>


      <div>
        
      </div>
    </div>
  );
};

export default Movies;
