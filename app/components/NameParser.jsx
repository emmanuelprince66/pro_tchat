"use client";

import React, { useEffect, useState } from "react";

const NameParser = ({ steps, triggerNextStep, updateFormData }) => {
  const [nameValid, setNameValid] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const userInput = steps?.userName?.value?.trim();

    const invalidCharsRegex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    const nameRegex = /^(?:my name is|i am|it's|it is|call me|this is)?\s*(.+?)(?: is my name)?$/i;

    if (invalidCharsRegex.test(userInput)) {
      setNameValid(false);
    } else {
      const match = userInput?.match(nameRegex);
      let nameValue = "";

      if (match && match[1]) {
        nameValue = match[1].trim();
      } else if (/^[a-zA-Z\s]+$/.test(userInput)) {
        nameValue = userInput;
      } else {
        setNameValid(false);
      }

      setName(nameValue);
      updateFormData(nameValue); // Assuming updateFormData is a function passed from the parent component
    }
  }, [steps, updateFormData]);

  useEffect(() => {
    if (name && nameValid) {
      triggerNextStep({ value: name });
    } else if (!nameValid) {
      triggerNextStep({ value: "invalid" });
    }
  }, [name, nameValid, triggerNextStep]);

  if (!nameValid) {
    return (
      <div>
        <p>
          Invalid name, please try again. Only letters and spaces are allowed.
        </p>
      </div>
    );
  }

  return null;
};

export default NameParser;
