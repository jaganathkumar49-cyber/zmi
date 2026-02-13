import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import FormController from "../../components/ui/formcontroller/FormController";
import { ArrowLeft, ArrowRight, LogIn, Navigation } from "lucide-react";


const loginSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});


const Login = () => {
  const navigate = useNavigate();


  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });


  const onSubmit = (data) => {
    console.log("Login Data:", data);


    // ✅ mark logged in
    localStorage.setItem("isAuth", "true");


    navigate("/HomePage");
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f7fb]">
      <div className="w-100 max-w-sm bg-white rounded-3xl p-10 shadow-xl">

        <h1 className="text-2xl text-center font-semibold text-green-600 mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-center text-slate-500 mb-6">
          Sign in to your account
        </p>


        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          <FormController
            label="Username"
            type="text"
            control={form.control}
            name="username"
            placeholder="Enter username"
            error={form.formState.errors.username?.message}
          />


          <FormController
            label="Password"
            type="password"
            control={form.control}
            name="password"
            placeholder="Enter password"
            error={form.formState.errors.password?.message}
          />


          <button

            type="submit"

            className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2.5 rounded-xl text-sm font-medium transition shadow-md hover:scale-102"
          >
            Sign In
            <LogIn size={20} className="text-white-600 w-full" />
          </button>
        </form>
      </div>
    </div>
  );
};


export default Login;
