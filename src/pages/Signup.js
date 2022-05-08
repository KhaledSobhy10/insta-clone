import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../images/logo.png";

import {
  addUserProfile,
  isEmailAlreadyExist,
  isUserNameAlreadyExist,
  signupUserWithEmailAndPassword,
  addUserDisplayName,
  isUserFullNameAlreadyExist,
} from "../lib/userAuth";

import { getErrorMessageFromCode } from "../lib/common";

import { LOG_IN, HOME } from "../constants/routes";

export default function Signup() {
  //
  const [firebaseError, setFirebaseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  // will called if submit button clicked
  async function handleSignupSubmit(user) {
    setIsLoading(true);
    if (await isUserNameAlreadyExist(user.name)) {
      setFirebaseError("This username isn't available. Please try another.");
    } else if (await isUserFullNameAlreadyExist(user.fullName)) {
      setFirebaseError(
        "This full username isn't available. Please try another."
      );
    } else if (await isEmailAlreadyExist(user.email)) {
      setFirebaseError("Email already exist.");
    } else {
      setFirebaseError("");
      signupUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          navigate(HOME);
          // Signed in
          const userResponse = userCredential.user;
          user.id = userResponse.uid;
          user.followers = [];
          user.following = [];
          addUserProfile(user);
          addUserDisplayName(user.name);
        })
        .catch((error) => {
          console.log(error.message);
          setFirebaseError(getErrorMessageFromCode(error.code));
        });
    }
    setIsLoading(false);
    reset();
  }

  // to set title of page
  useEffect(() => {
    document.title = "Signup | Instagram";
  }, []);

  // component
  return (
    <div className="h-screen container flex flex-col m-auto  justify-center items-center pt-5">
      <img src={logo} alt="instagram" />
      <p className=" w-80 p-3 text-center text-gray-500 font-semibold">
        Sign up to see photos and videos from your friends.
      </p>

      <p className="w-80 text-red-600">{firebaseError}</p>

      <form
        onSubmit={handleSubmit(handleSignupSubmit)}
        className="flex flex-col gap-1 w-full items-center"
      >
        <input
          className="w-80  border-solid border-2  outline-slate-400	p-2 rounded text-sm mt-2"
          aria-label="Enter full name"
          placeholder="Full Name"
          {...register("fullName", {
            required: "Should enter your full Name.",
          })}
        />
        {errors.fullName && (
          <p className="w-80 text-red-600">{errors.fullName.message}</p>
        )}
        <input
          className="w-80  border-solid border-2  outline-slate-400	p-2 rounded text-sm mt-2"
          aria-label="Enter name"
          placeholder="Name"
          {...register("name", {
            required: "Should enter your Name.",
          })}
        />
        {errors.name && (
          <p className="w-80 text-red-600">{errors.name.message}</p>
        )}

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
          Sign up
          <span
            className={`${
              !isLoading ? "hidden" : ""
            } animate-spin h-5 w-5 border-blue-700  border-r-transparent border-4 rounded-full`}
          ></span>
        </button>
      </form>
      <p className="my-3 text-sm text-slate-700">
        Have an account?{" "}
        <Link to={LOG_IN} className="text-sky-600">
          Log in
        </Link>
      </p>
    </div>
  );
}
