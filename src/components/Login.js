import React, { useRef, useState } from "react";
import Header from "./Header";
import { addUser } from "../utils/userSlice";
import { updateProfile } from "firebase/auth";

import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { BG_URL, USER_AVATAR } from "../utils/constant";

export default function Login() {
  const [isSingInForm, SetisSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
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
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // Profile updated!
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
        <img src={BG_URL} alt="logo" />
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
