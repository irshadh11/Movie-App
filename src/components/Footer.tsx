import BlurCircle from "./BlurCircle";
import logowhite from "../assets/logowhite.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-24 overflow-hidden ">
      <BlurCircle top="0" right="80px" />

      <div className="px-6 md:px-16 lg:px-24 xl:px-44">
        <div className="relative flex items-center justify-between pt-20 pb-10">
        <Link to='/' className='max-md:flex-1'>
        <img src= {logowhite} alt='BookMySeat' className='w-36 h-auto'></img>
        </Link>
          <ul className="flex items-center gap-6 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white transition">
                Licensing
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t border-white/10" />

        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <a href="/" className="hover:text-white transition cursor-pointer">
              BookMySeat™
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
