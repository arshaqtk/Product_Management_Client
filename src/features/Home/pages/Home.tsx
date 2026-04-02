import { useAuthStore } from "../../auth/store/auth.store";

export const Home = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f6faf7]">
      <h1 className="text-3xl font-bold text-[#033f63]">Welcome, {user?.name}!</h1>
      <button 
        onClick={() => logout()} 
        className="mt-6 bg-[#eda52d] text-white py-2 px-6 rounded-full font-semibold hover:opacity-90 transition-all"
      >
        Logout
      </button>
    </div>
  );
};
