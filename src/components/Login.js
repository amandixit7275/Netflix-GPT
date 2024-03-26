import React, { useRef, useState } from "react";
import Header from "./Header";
import { updateProfile } from "firebase/auth";

import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSingInForm, SetisSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    //sign up form
    if (!isSingInForm) {
      //singUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/98741267?v=4",
          })
            .then(() => {
              // Profile updated!
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  function togglesignInForm() {
    SetisSignInForm(!isSingInForm);
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(event) => event.preventDefault()}
        className=" w-1/4  p-12 bg-black absolute my-36 mx-auto right-0 left-0 text-white "
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSingInForm ? "Sign In" : "Sign up"}
        </h1>
        {!isSingInForm && (
          <input
            ref={name}
            className="p-2 m-2 w-full bg-gray-700 "
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className="p-2 m-2 w-full bg-gray-700 "
          type="text"
          placeholder="Email Address"
        />

        <input
          ref={password}
          className="p-2 m-2 w-full bg-gray-700 "
          type="password"
          placeholder="Password"
        />
        <p className=" p-4 my-6 text-red-500">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className=" cursor-pointer rounded-lg p-4 my-6 w-full bg-red-700 "
        >
          {isSingInForm ? "Sign In" : "Sign up"}
        </button>
        <p className="p-y-4 cursor-pointer" onClick={togglesignInForm}>
          {isSingInForm
            ? "New to Netflix ? Sing Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
}
