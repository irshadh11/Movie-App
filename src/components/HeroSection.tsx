import { useEffect, useState } from "react";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";

import tmdb from "../utils/tmdb";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
};

const HeroSection = () => {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const fetchNowPlayingMovies = async () => {
    try {
      const res = await fetch(
        `${tmdb.baseUrl}${tmdb.endpoints.nowPlaying}`
      );
      const data = await res.json();

      if (!data?.results?.length) return;

      const detailedMovies: Movie[] = await Promise.all(
        data.results.slice(0, 7).map(async (movie: { id: number }) => {
          const detailsRes = await fetch(
            `${tmdb.baseUrl}${tmdb.endpoints.movieDetails(movie.id)}`
          );
          return detailsRes.json();
        })
      );

      setMovies(detailedMovies);
    } catch (error) {
      console.error("TMDB HeroSection error:", error);
    }
  };

  if (!movies.length) return null;

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000}}
      loop
      className="h-screen"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div
            className="
              flex flex-col items-start justify-center gap-4
              px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen
            "
            style={{
              backgroundImage: `url(${tmdb.imageBaseUrl}${movie.backdrop_path})`,
            }}
          >
            <h1 className="text-5xl md:text-[70px] md:leading-[4.5rem] font-semibold max-w-xl">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-300 flex-wrap">
              <span>
                {movie.genres.map((g) => g.name).join(" | ")}
              </span>

              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{movie.release_date?.slice(0,4)}</span>
              </div>

              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>
                  {Math.floor(movie.runtime / 60)}h{" "}
                  {movie.runtime % 60}m
                </span>
              </div>
            </div>

            <p className="max-w-xl text-gray-200 line-clamp-6">
              {movie.overview}
            </p>

            <button
              onClick={() => navigate("/movies")}
              className="
                flex items-center gap-1 px-6 py-3 text-sm bg-red-500/40 hover:bg-red-500/60
                border border-red-400/40 backdrop-blur-md transition rounded-full font-medium cursor-pointer
              ">
              Explore More
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
