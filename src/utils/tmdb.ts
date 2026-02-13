const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

const tmdb = {
  baseUrl: "https://api.themoviedb.org/3",
  imageBaseUrl: "https://image.tmdb.org/t/p/original",

  endpoints: {
    nowPlaying: `/movie/now_playing?api_key=${API_KEY}`,
    popular: `/movie/popular?api_key=${API_KEY}`,
    upcoming: `/movie/upcoming?api_key=${API_KEY}`,

    movieDetails: (id: number) =>
      `/movie/${id}?api_key=${API_KEY}`,

    collectionDetails: (collectionId: number) =>
      `/collection/${collectionId}?api_key=${API_KEY}`,

  },
};

export default tmdb;
