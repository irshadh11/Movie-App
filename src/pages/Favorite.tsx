 import { mockFavoriteMovies } from '../mock/favorites';
import MovieCard from '../components/MovieCard';
import { useEffect, useState } from 'react';
import CircularUnderLoad from '../components/CircularUnderLoad';

const Favorite = () => {
  const [loading, setLoading] = useState(true)

  const favoriteMovies = mockFavoriteMovies.filter(
    movie => movie.isFavorite
  );
  useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);
  
      return () => clearTimeout(timer);
    }, []);
    if (loading) return <CircularUnderLoad />
  return (
    <div className='relative overflow-hidden'>
      <div className='px-6 md:px-16 lg:px-24 xl:px-44 pt-28 pb-20 '>
        <div className='relative flex items-center justify-between pb-10'>
          <p className='text-gray-300 font-medium text-xl'>
            Your Favorite Movies
          </p>
        </div>

        <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6'>
          {favoriteMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              hoverEffect={true} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Favorite;