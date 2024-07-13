"use client";
import React, { useEffect, useState } from "react";

const PhoneParser = ({ userInput, triggerNextStep }) => {
  const [phoneValid, setPhoneValid] = useState(true);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const invalidCharsRegex = /[a-zA-Z]/;
    const phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (invalidCharsRegex.test(userInput)) {
      setPhoneValid(false);
    } else {
      const match = userInput.match(phoneRegex);
      let phoneValue = "";

      if (match) {
        phoneValue = match[0].trim();
      } else {
        setPhoneValid(false);
      }

      setPhone(phoneValue);
    }
  }, [userInput]);

  useEffect(() => {
    if (phone && phoneValid) {
      triggerNextStep({ value: phone });
    } else if (!phoneValid) {
      triggerNextStep({ value: "invalid" });
    }
  }, [phone, phoneValid, triggerNextStep]);

  if (!phoneValid) {
    return (
      <div>
        <p>
          Invalid phone number, please try again. Only numbers and + - ( ) . are
          allowed.
        </p>
      </div>
    );
  }

  return null;
};

export default PhoneParser;
