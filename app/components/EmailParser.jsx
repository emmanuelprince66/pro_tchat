"use client";
import React, { useEffect, useState } from "react";

const EmailParser = ({ userInput, triggerNextStep }) => {
  const [emailValid, setEmailValid] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const invalidCharsRegex = /[^a-zA-Z0-9@.]/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (invalidCharsRegex.test(userInput)) {
      setEmailValid(false);
    } else {
      const match = userInput?.match(emailRegex);
      let emailValue = "";

      if (match) {
        emailValue = match[0].trim();
      } else {
        setEmailValid(false);
      }

      setEmail(emailValue);
    }
  }, [userInput]);

  useEffect(() => {
    if (email && emailValid) {
      triggerNextStep({ value: email });
    } else if (!emailValid) {
      triggerNextStep({ value: "invalid" });
    }
  }, [email, emailValid, triggerNextStep]);

  if (!emailValid) {
    return (
      <div>
        <p>
          Invalid email, please try again. Only a-z, A-Z, 0-9, @, ., _, %, +, -
          are allowed.
        </p>
      </div>
    );
  }

  return null;
};

export default EmailParser;
