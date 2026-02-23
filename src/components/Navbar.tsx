import { NavLink, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import logowhite from "../assets/logowhite.svg";
import { ClapperboardIcon, Heart, Home, TicketPlus, } from "lucide-react";
import { useEffect, useState } from "react";
import tmdb from "../utils/tmdb";

type Movie = {
  id: number;
  title: string;
};

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const handleSearch = async (value: string) => {
  setQuery(value);
  if (!value.trim()) {
    setResults([]);
    return;
  }
  try {
    const res = await fetch(
      `${tmdb.baseUrl}${tmdb.endpoints.searchMovies(value)}`
    );
    const data = await res.json();
    setResults(data.results || []);
  } catch (error) {
    console.error("Search error:", error);
  }
};
useEffect(() => {
  const delay = setTimeout(() => {
    if (query.trim()) {
      handleSearch(query);
    }
  }, 400);


  return () => clearTimeout(delay);
}, [query]);

  return (
  <div className=" w-64 h-full text-gray-300 flex flex-col px-6 py-8 shadow-2xl border-r border-gray-800" >

  <div className="flex flex-col flex-1 gap-8">

    <NavLink to="/" className="flex justify-center">
      <img src={logowhite} alt="BookMySeat" className="w-28 opacity-90 hover:opacity-100 transition" />
    </NavLink>

    <div className="relative">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="px-4 py-2.5 rounded-lg bg-black/70 border border-slate-800 
        border-orange-400/40 focus:ring-1 focus:ring-orange-500 
        text-sm text-white outline-none"
    />
      {results.length > 0 && (
        <div className="absolute w-full bg-black/90 border border-gray-700 rounded-lg max-h-80 overflow-y-auto z-50">
            {results.slice(0, 6).map((movie) => (
        <div
        key={movie.id}
        className="px-4 py-2 hover:bg-slate-800 cursor-pointer"
        onClick={() => {navigate(`/movie/${movie.id}`)
        
        setQuery("");        
        setResults([]);      
        }}
        >
        {movie.title}
        </div>
    ))}
    </div>
    )}
    {query && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-black/95 
        border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-400">
            No results found...
        </div>
    )}

    </div>

    <nav className="flex flex-col gap-3 text-sm font-medium">
      <NavLink to="/" className={({ isActive }) =>
        `px-4 py-2.5 flex items-center gap-2 rounded-lg transition-all ${
          isActive
            ? " bg-orange-500/40  text-white"
            : "hover:bg-orange-500/60"
        }`
      }><Home className="relative w-4 h-4" /> 
      Home</NavLink>

      <NavLink to="/movies" className={({ isActive }) =>
        `px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
          isActive
            ? " bg-orange-500/40  text-white "
            : "hover:bg-orange-500/60 "
        }`
      }><ClapperboardIcon className="relative w-4 h-4"/>
        Movies</NavLink>

      <NavLink to="/favorite" className={({ isActive }) =>
        `px-4 py-2.5 flex items-center gap-2 rounded-lg transition-all ${
          isActive
            ? " bg-orange-500/40  text-white "
            : "hover:bg-orange-500/60 "
        }`
      }>
        <Heart className="relative w-4 h-4 " />
        Favorite</NavLink>

      <NavLink to="/mybookings" className={({ isActive }) =>
        `px-4 py-2.5 flex items-center gap-2 rounded-lg transition-all ${
          isActive
            ? " bg-orange-500/40  text-white"
            : "hover:bg-orange-500/60 "
        }`
      }>
        <TicketPlus className="relative w-4 h-4" />
        My Bookings</NavLink>

    </nav>

  </div>

  <div className="pt-10 border-t border-gray-800">
    {!user ? (
      <button
        onClick={() => openSignIn()}
        className="w-full py-2.5 rounded-lg bg-orange-500/40 hover:bg-orange-500/60 border border-red-400/40"
      >
        Login
      </button>
    ) : (
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 uppercase">
          Account
        </span>
        <UserButton>
            <UserButton.MenuItems>
                <UserButton.Action label='My Bookings' labelIcon=
                    {<TicketPlus width={15}/>} onClick={() => navigate('/mybookings')}/>
            </UserButton.MenuItems>
        </UserButton>
      </div>
    )}
  </div>

</div>

  );
};

export default Navbar;
