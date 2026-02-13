import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import tmdb from "../utils/tmdb";

const FeatureSection = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const res = await fetch(
        tmdb.baseUrl + tmdb.endpoints.nowPlaying
      );
      const data = await res.json();
      setMovies(data.results);
    };

    fetchNowPlaying();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <BlurCircle top="0" right="80px" />

      <div className="relative flex items-center justify-between pt-20 pb-10">
        <p className="text-gray-300 font-medium text-xl">
          Now Showing
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
        >
          View All
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
        {movies.slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            window.scrollTo(0, 0);
          }}
          className="px-6 py-3 text-sm bg-red-500/40 hover:bg-red-500/60
            border border-red-400/40 backdrop-blur-md transition rounded-full font-medium cursor-pointer
          "
        >
          Show more
        </button>
      </div>
      
    </div>
  );
};

export default FeatureSection;
