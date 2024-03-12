import React, { isValidElement, useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";

export default function Login() {
  const [isSingInForm, SetisSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //Validate the form data
    //checkValidData(email,password)
    console.log(email.current.value);
    console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
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
        onSubmit={(e) => e.preventDefault()}
        className=" w-1/4  p-12 bg-black absolute my-36 mx-auto right-0 left-0 text-white "
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSingInForm ? "Sign In" : "Sign up"}
        </h1>
        <input
          ref={email}
          className="p-2 m-2 w-full bg-gray-700 "
          type="text"
          placeholder="Email Address"
        />
        {!isSingInForm && (
          <input
            className="p-2 m-2 w-full bg-gray-700 "
            type="text"
            placeholder="Full Name"
          />
        )}
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
        <p className="p-y-4" onClick={togglesignInForm}>
          {isSingInForm
            ? "New to Netflix ? Sing Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
}
