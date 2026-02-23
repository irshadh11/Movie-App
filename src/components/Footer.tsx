import { Link } from "react-router-dom";
import logowhite from "../assets/logowhite.svg";

const Footer = () => {
  return (
    <footer className="bg-black/80 text-white mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 md:text-center gap-8 border-t border-gray-800 py-10 w-full px-6">

      <div className="flex flex-col items-start  gap-2">
        <Link to="/"
        onClick={() => window.scrollTo(0, 0)}
        >
      <img  src={logowhite} alt="BookMySeat Logo" className="h-10" />
      </Link>
        <p className="text-sm text-left text-gray-400 max-w-sm leading-relaxed ">
          Your go-to platform for booking movie tickets online. 
          Experience the magic of cinema with us!</p>
      </div>

      <div className="flex flex-col gap-3 cursor-pointer">
        <a href="/" className="hover:text-orange-400 transition ">Home</a>
        <a href="/movies" className="hover:text-orange-400 transition ">Movies</a>
        <a className=" hover:text-orange-400 transition ">Contact Us</a>
      </div>
      <div className="flex flex-col gap-3 cursor-pointer">
        <a className=" hover:text-orange-400 transition ">About Us</a>
        <a className=" hover:text-orange-400 transition ">Terms of Service</a>
        <a className=" hover:text-orange-400 transition ">Privacy Policy</a>
        <a className=" hover:text-orange-400 transition ">Support</a> 
        </div>
        
        </div>
        <p className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} 
        <a
         href="/" className="hover:text-orange-400 transition cursor-pointer">
          BookMySeat.
        </a>
         All rights reserved.</p>


    </footer>
  )
}
export default Footer