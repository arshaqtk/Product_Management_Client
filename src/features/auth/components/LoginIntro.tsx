import { Link } from "react-router-dom";
import sideImg from "../../../assets/signUp-Left-Img.png";

export const LoginIntro = () => {
  return (
    <div 
      className="flex-1 relative flex flex-col justify-center items-center p-12 text-white text-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${sideImg})` }}
    >
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-[2.2rem] font-bold mb-4">Hello Friend!</h1>
        <p className="text-[0.95rem] text-[#aed0eb] mb-10 leading-relaxed max-w-[260px]">
          Enter your details and start your journey with us!
        </p>
        <Link 
          to="/signup" 
          className="bg-transparent border border-white text-white py-3 px-12 rounded-full font-semibold cursor-pointer transition-all duration-300 text-[0.85rem] tracking-wide hover:bg-white hover:text-[#044569]"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};
