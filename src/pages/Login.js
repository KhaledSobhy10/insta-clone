import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import logo from "../images/logo.png";
import profileImg from "../images/iphone-with-profile.png";

import { getErrorMessageFromCode } from "../lib/common";
import { signInWithEmailAndPasswordOnly } from "../lib/userAuth";

import { HOME, SIGN_UP } from "../constants/routes";

export default function Login() {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  function signIn(user) {
    setIsLoading(true);
    signInWithEmailAndPasswordOnly(user.email, user.password)
      .then((userCredential) => {
        setIsLoading(false);
        // Signed in
        const user = userCredential.user;
        console.log("signed in", user);
        // should go to home page
        navigate(HOME);
      })
      .catch((error) => {
        setIsLoading(false);
        setFirebaseError(getErrorMessageFromCode(error.code));
      });
  }

  function handleLoginSubmit(data) {
    setFirebaseError("");
    signIn(data);
  }

  // to set title of page
  useEffect(() => {
    document.title = "Login | Instagram";
  }, []);

  return (
    <div className="container flex m-auto justify-center items-center gap-3 h-screen ">
      <img src={profileImg} className="md:block hidden w-1/3" alt="" />
      <div className="flex flex-col items-center  w-1/2">
        <img src={logo} alt="instagram" />
        <p className="w-80 text-red-600">{firebaseError}</p>
        <form
          onSubmit={handleSubmit(handleLoginSubmit)}
          className="flex flex-col gap-1 w-full items-center"
        >
          <input
            className="w-80  border-solid border-2  outline-slate-400	p-2 rounded text-sm mt-2"
            aria-label="Enter Email"
            placeholder="Email"
            {...register("email", {
              required: "Should enter your email.",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "invalid email !!",
              },
            })}
          />
          {errors.email && (
            <p className="w-80 text-red-600">{errors.email.message}</p>
          )}
          <input
            className="w-80 border-solid border-2 p-2 outline-slate-400  rounded text-sm mt-2"
            aria-label="Enter Password"
            placeholder="Password"
            {...register("password", {
              required: "Should enter password.",
              minLength: { value: 8, message: "invalid password " },
            })}
          />
          {errors.password && (
            <p className="w-80 text-red-600">{errors.password.message}</p>
          )}
          <button
            type="submit"
            disabled={!isValid || !isDirty}
            value="Sign up"
            className={`rounded w-80  bg-blue-500 text-white p-1.5 mt-3  flex  justify-center gap-2 ${
              !isValid || !isDirty ? "opacity-50" : ""
            }`}
          >
            Log in
            <span
              className={`${
                !isLoading ? "hidden" : ""
              } animate-spin h-5 w-5 border-blue-700  border-r-transparent border-4 rounded-full`}
            ></span>
          </button>
        </form>
        <p className="my-3 text-sm text-slate-900">
          Don't have an account ?{" "}
          <Link to={SIGN_UP} className="text-sky-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
