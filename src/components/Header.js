import React, { useEffect } from "react";
import logo from "../utils/netflix-logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGPTsearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const gptSlice = useSelector((store) => store.gpt);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGPTClick = () => {
    dispatch(toggleGPTsearchView());
  };
  const handleLangChange = (event) => {
    console.log(event.target.value);
    dispatch(changeLanguage(event.target.value));
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="absolute w-screen px-4 md:px-8 py-8 bg-gradient-to-b from-black z-10 flex flex-col gap-5 md:flex-row justify-between md:gap-0">
      <img className="w-36 mx-auto md:mx-0" src={logo} alt="Netflix-logo" />
      {user && window.location.pathname !== "/" && (
        <div className="flex align-middle mx-auto md:mx-0">
          {gptSlice.showGptSearch && (
            <select
              className="mx-4 h-9 bg-gray-700 text-white rounded-lg"
              name=""
              id=""
              onChange={handleLangChange}
            >
              {SUPPORTED_LANGUAGES.map((item, index) => {
                return (
                  <option value={item.identifier} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}
          <button
            className="bg-purple-700 text-white font-bold px-4 h-9 rounded-lg"
            onClick={handleGPTClick}
          >
            {gptSlice.showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            src={user.photoURL}
            alt=""
            className="hidden md:block h-9 px-6"
          />
          <p className="hidden md:block   text-white font-lg font-bold pt-2 pr-8 cursor-pointer  ">
            {user.displayName}
          </p>
          <p
            className="text-white bg-gray-700 font-bold px-3 pt-1 h-9 rounded-lg mx-3 md:mx-0"
            onClick={handleSignOut}
          >
            SignOut
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
