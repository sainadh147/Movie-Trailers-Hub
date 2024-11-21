import React from "react";

const validate = (email, password) => {
  const EmailValid = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
  const PassValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(
    password
  );

  if (!EmailValid) return "Email ID is not Valid.";
  if (!PassValid) return "Password is not supported.";
  return null;
};

export default validate;
