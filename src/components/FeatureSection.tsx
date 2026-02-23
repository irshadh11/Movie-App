import { ArrowRight, ChevronLeft, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import tmdb from "../utils/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import {FreeMode, Navigation  } from "swiper/modules";

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
    <div className="relative w-full py-7">
       <div className="space-y-12 relative z-10">
      <div className="flex justify-between items-center "
      style={{marginBottom:"12px"}}>
        <p className="text-xl font-semibold text-white ">
          Book Your Seat for the Latest Movies
        </p>
        <button
          onClick={() => navigate("/movies")}
          className="flex items-center gap-1 text-orange-400 "
        >
          View All
          <ArrowRight size={18} />
        </button>
      </div>
      <ChevronLeft className="prev-btn bg-orange-500/60 hover:bg-orange-500/80 border border-orange-400/40 absolute left-2 top-1/2 z-10 rounded-lg w-8 h-10 p-1">
      Prev
      </ChevronLeft>

     <ChevronRightIcon className="next-btn bg-orange-500/60 hover:bg-orange-500/80
      border border-orange-400/40 absolute right-2 top-1/2 z-10 rounded-lg w-8 h-10 p-1">
      Next
      </ChevronRightIcon>
      
      <Swiper
      modules={[FreeMode,Navigation]}
      freeMode={true}
      navigation={{
        nextEl:".next-btn",
        prevEl:".prev-btn"
      }}
      slidesPerView="auto"
      spaceBetween={16}
      >
    
        {movies.slice(8,20).map((movie) => (
          <SwiperSlide key={movie.id} className="w-auto!">
          <MovieCard key={movie.id} movie={movie} />
          
        </SwiperSlide>
        ))}
        </Swiper>
    </div>
    </div>
)}



export default FeatureSection;
