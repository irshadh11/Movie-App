import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import tmdb from "../utils/tmdb";

const MovieCard = ({ movie }: { movie: any }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div
      className="group w-60 rounded-2xl bg-white/5 border border-white/10
        backdrop-blur-md overflow-hidden transition hover:-translate-y-1 
      ">
      <div className="relative">
        <img
          onClick={() => {navigate(`/movie/${movie.id}`);
          scrollTo(0, 0);
          }}
          src={`${tmdb.imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          className="h-80 w-full object-cover cursor-pointer
          "
        />

        {movie.vote_average && (
          <div className=" absolute top-3 right-3 flex items-center gap-1 px-2 py-1
            text-xs bg-black/60 rounded-full text-white backdrop-blur
          ">
            <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <p className="font-semibold text-white truncate">
          {movie.title}
        </p>
        
        {movie.release_date && (
          <p className="text-sm text-gray-400">
            {movie.release_date?.slice(0,4)}
          </p>
        )}

        <button
          onClick={() => {navigate(`/movie/${movie.id}`); 
          scrollTo(0, 0);
          }}
          className="mt-3 w-full px-4 py-2 text-sm bg-red-500/40 hover:bg-red-500/60 border border-red-400/40
            backdrop-blur-md transition rounded-full font-medium text-white
          ">
          Buy Tickets
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
