import React, { useRef, useState } from "react";
import Header from "./Header";
import BackgroundImage from "../utils/Background-image.jpg";
import validate from "../utils/validate";
import auth from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMess, setErrorMess] = useState("");
  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const handleValidation = () => {
    // Validate the form data
    const message = validate(email.current.value, password.current.value);
    setErrorMess(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed Up
          const user = userCredential.user;
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
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
            })
            .catch((error) => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMess(errorMessage);
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
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMess(errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={BackgroundImage}
          alt="Background-img"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute flex flex-col my-52 bg-black mx-auto left-0 right-0 text-white px-24 py-10 gap-5 bg-opacity-80 sm:w-8/12 md:6/12 lg:w-5/12  xl:w-5/12 "
        action=""
      >
        <p className="p-2 text-3xl font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </p>
        {!isSignInForm && (
          <input
            ref={name}
            type="name"
            placeholder="Full Name"
            name=""
            id="name"
            className="p-2 m-2 bg-gray-500"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email or phone Number"
          name=""
          id="email"
          className="p-2 m-2 bg-gray-500"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          name=""
          id=""
          className="p-2 m-2 bg-gray-500"
        />
        {errorMess && (
          <p className="p-2 text-red-600 font-bold text-lg">{errorMess}</p>
        )}
        <button
          className="text-white p-2 m-2 bg-red-700"
          onClick={handleValidation}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already Netflix User? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
