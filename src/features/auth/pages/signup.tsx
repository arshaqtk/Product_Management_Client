import React from "react";
import { SignupIntro } from "../components/SignupIntro";
import { SignupForm } from "../components/SignupForm";

const Signup = () => {
  return (
    <div className="h-screen w-screen flex font-sans overflow-hidden">
      <div className="flex w-full h-full bg-white text-left">
        <SignupIntro />
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
