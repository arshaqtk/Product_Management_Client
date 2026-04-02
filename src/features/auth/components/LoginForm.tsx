import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import type { LoginPayload } from "../types/auth.types";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<LoginPayload>();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await loginUser(data);
      if (res && res.user) {
        login(res.user);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <div className="flex-[1.2] p-12 flex flex-col justify-center items-center bg-white">
      <h2 className="text-[#eda52d] text-[2.2rem] font-bold mb-10 text-center">
       Sign In to <br /> Your Account
      </h2>
      <form className="w-full max-w-[320px] flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex items-center">
          <Mail className="absolute left-4 text-[#9cb3a8]" size={20} />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="w-full p-[1rem_1rem_1rem_3.2rem] bg-[#f6faf7] border border-transparent rounded text-[0.95rem] text-[#333] transition-colors duration-300 focus:outline-none focus:border-[#eda52d] placeholder:text-[#a0b8ac]"
          />
        </div>
        <div className="relative flex items-center">
          <Lock className="absolute left-4 text-[#9cb3a8]" size={20} />
          <input
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-[1rem_3.2rem_1rem_3.2rem] bg-[#f6faf7] border border-transparent rounded text-[0.95rem] text-[#333] transition-colors duration-300 focus:outline-none focus:border-[#eda52d] placeholder:text-[#a0b8ac]"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-[#9cb3a8] hover:text-[#333] focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex justify-center w-full">
            <Link to="#" className="text-md border-b leading-tight mt-1 border-transparent text-[#9cb3a8] hover:text-[#eda52d] hover:border-[#eda52d] transition-all duration-300">
              Forgot your password?
            </Link>
        </div>
        <button 
          type="submit" 
          className="bg-[#eda52d] text-white border-none p-4 rounded-full font-semibold cursor-pointer mt-2 transition-all duration-300 transform text-[0.9rem] tracking-wide shadow-[0_4px_6px_rgba(237,165,45,0.2)] hover:opacity-90 hover:-translate-y-[1px]"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
};
