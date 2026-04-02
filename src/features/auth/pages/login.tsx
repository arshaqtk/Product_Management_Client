import { LoginIntro } from "../components/LoginIntro";
import { LoginForm } from "../components/LoginForm";

const Login = () => {
  return (
    <div className="h-screen w-screen flex font-sans overflow-hidden">
      <div className="flex w-full h-full bg-white text-left">
        <LoginForm />
        <LoginIntro />
      </div>
    </div>
  );
};

export default Login;