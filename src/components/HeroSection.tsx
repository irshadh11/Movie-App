import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";



import tmdb from "../utils/tmdb";
import CircularUnderLoad from "./CircularUnderLoad";

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
  vote_average: number;
};

const HeroSection = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const fetchNowPlayingMovies = async () => {
    try {
      setLoading(true);
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
    finally {
    setLoading(false); 
  }
  };
  if (loading) return <CircularUnderLoad />;
  if (!movies.length) return null;


  return (
    <Swiper
      modules={[Pagination,Autoplay]}
      autoplay={{
        delay: 5000,
      }}
      pagination={{ 
        type:"bullets",
        clickable:true,
        bulletClass:"swiper-pagination-bullet !bg-gray-100/70 w-3 h-3",
        bulletActiveClass:"swiper-pagination-bullet-active !bg-orange-500 !w-15 !h-3 !rounded-lg transition-all", 
      }}
      slidesPerView={1}
      className="h-[85vh] w-full rounded-lg overflow-hidden"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="w-full h-[85vh] flex flex-col bg-black/90 text-white rounded-lg overflow-hidden ">
          <div
            className="h-[80%] bg-cover bg-center"
            style={{
              backgroundImage: `url(${tmdb.imageBaseUrl}${movie.backdrop_path})`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t
          from-black via-black/80 to-transparent"
          />
            <div className="p-6  flex flex-col justify-center items-center bg-black/80 backdrop-blur-sm
            text-center gap-4"> 
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {movie.title}
            </h1>
            <p className="text-gray-300 max-w-3xl line-clamp-3">
              {movie.overview}
            </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
