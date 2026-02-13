import React from "react";
import { useForm } from "react-hook-form";
import FormController from "../../components/ui/formcontroller/FormController";

const ExampleFormView = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl text-amber-50 font-bold mb-6">Form Controller Example</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-red-50">
        <FormController
          label="Username"
          type="text"
          control={form.control}
          name="username"
          placeholder="Enter username"
          rules={{ required: "Username is required" }}
        />
        <FormController
          label="Email"
          type="email"
          control={form.control}
          name="email"
          placeholder="Enter email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <FormController
          label="Password"
          type="password"
          control={form.control}
          name="password"
          placeholder="Enter password"
          rules={{ required: "Password is required", minLength: { value: 6, message: "Min length is 6" } }}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExampleFormView;
