import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import tmdb from "../utils/tmdb";
import CircularUnderLoad from "../components/CircularUnderLoad";

const Movies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        tmdb.baseUrl + tmdb.endpoints.popular
      );

      const data = await res.json();
      setMovies(data.results);

    } catch (error) {
      console.error("Movies fetch error:", error);
    } finally {
      setLoading(false);
    }};
    fetchMovies();
  }, []);
  
  if (loading) return <CircularUnderLoad />

  return (
    <div className="relative overflow-hidden ">
     

      <div className="px-6 md:px-16 lg:px-24 xl:px-44 pt-28 pb-20 ">
        <div className="relative flex items-center justify-between pb-10">
          <p className="text-gray-300 font-medium text-xl">
            Movies Now Playing
          </p>
        </div>
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6
          ">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie}  hoverEffect={true}  />
          ))}
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Movies;
