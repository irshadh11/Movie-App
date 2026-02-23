import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeartIcon, StarIcon } from "lucide-react";
import tmdb from "../utils/tmdb";
import {mockFavoriteMovies} from "../mock/favorites";
import toast from "react-hot-toast"
import CircularUnderLoad from "../components/CircularUnderLoad";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  original_language:string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  vote_average :number;
  isFavorite? :boolean;

};

const MoviesDetails = () => {
  const {id} = useParams();
  const movieId = Number(id)
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (movie) {
      const found = mockFavoriteMovies.find(
        fav => fav.id === movie.id
      );
      setIsFavorite(found?.isFavorite ?? false);
  }
  }, [movie]);
  useEffect(() => {
    if (id) {
      fetchMoviesDetails();
    }
  }, [id]);

  const fetchMoviesDetails = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `${tmdb.baseUrl}${tmdb.endpoints.movieDetails(movieId)}`
      );
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      console.error("Movie Details error:", error);
    }
    finally{
      setLoading(false)
    }
  };
  if (loading || !movie) return <CircularUnderLoad />;
  return ( 
    <div className="min-h-screen px-6 md:px-16 lg:px-40 pt-25 md:pt-50">
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        <img 
        src={`${tmdb.imageBaseUrl}${movie.poster_path}`}
        alt="movie.title"
        className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />
      <div className="relative flex flex-col gap-3">
        <div className="" >
          <h3 className="text-primary p-2">
            Language: {movie.original_language.toUpperCase()}
          </h3>
          <h1 className="text-4xl font-semibold p-2">
            {movie.title}
          </h1>
        <div className=" flex items-center gap-2 p-2 ">
          <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-medium">
            {movie.vote_average.toFixed(1)} Ratings
          </span>
        </div>
        <div className="overflow-hidden ">
          <p className=" line-clamp-2 text-gray-300 ">
          {movie.overview}
        </p>
        </div>
        <div className="text-gray-400 p-2 hover:text-white">
          <span>{movie.release_date?.slice(0,4)} ▪ {Math.floor(movie.runtime / 60)}h{" "}
          {movie.runtime % 60}m ▪ {movie.genres.map((g) => g.name).join(" , ")}</span>
        </div>
        <div className="flex flex-row items-center gap-4 mt-4">

          <button className="px-8 py-3 m-3 text-sm bg-orange-500/40 hover:bg-orange-500/60
        border border-red-400/40 backdrop-blur-md transition rounded-full font-medium cursor-pointer
        "

        onClick={()=>{
          navigate(`/seatlayout/${movie.id}`)
        }}>
        Book Tickets
        </button>
        <button
        onClick={() => {
          const found = mockFavoriteMovies.find(
            fav => fav.id === movie.id
        );
        if (found) {
          found.isFavorite = !found.isFavorite;
          setIsFavorite(found.isFavorite);
          if (found.isFavorite) {
            toast.success("Added to Favorites ❤️");
          } else {
              toast("Removed from Favorites ❌");
        }
      }}}
        className="px-4 py-2.5 rounded-full transition-all bg-orange-500/40 hover:bg-orange-500/60
        border border-red-400/40 backdrop-blur-md"
        >
        <HeartIcon
        className={`w-6 h-6 transition ${
          isFavorite ? "text-red-500 fill-red-500" : "text-white"
        }`}

        />
    
        </button>

        </div>

        

      </div></div>
      </div>
      
   

    </div>
  )
}

export default MoviesDetails