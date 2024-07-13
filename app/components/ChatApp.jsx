"use client";
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import NameParser from "./NameParser";
import EmailParser from "./EmailParser";
import PhoneParser from "./PhoneParser";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#EF6C00",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#EF6C00",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#000", // Set user input text color to black
};

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const updateFormData = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleNext = ({ trigger, value }) => {
    if (trigger === "parseName") {
    } else if (trigger === "parseEmail") {
      updateFormData("email", value);
    } else if (trigger === "parsePhone") {
      updateFormData("phone", value);
    }
  };

  const steps = [
    {
      id: "greet",
      message:
        "Hello, I am PacBot. I can help with your onboarding process. Please state your name?",
      trigger: "userName",
    },
    {
      id: "userName",
      user: true,
      trigger: "parseName",
    },
    {
      id: "parseName",
      component: (
        <NameParser
          updateFormData={(value) => updateFormData("name", value)}
          triggerNextStep={handleNext}
        />
      ),
      waitAction: true,
      trigger: ({ value }) => (value === "invalid" ? "invalidName" : "welcome"),
    },
    {
      id: "welcome",
      message: `Welcome ${formData?.name || ""} ! What is your email?`,
      trigger: "userEmail",
    },
    {
      id: "userEmail",
      user: true,
      trigger: "parseEmail",
    },
    {
      id: "parseEmail",
      component: (
        <EmailParser
          triggerNextStep={handleNext}
          updateFormData={(value) => updateFormData("email", value)}
        />
      ),
      waitAction: true,
      trigger: ({ value }) => (value === "invalid" ? "invalidEmail" : "phone"),
    },
    {
      id: "invalidEmail",
      message: "Invalid email, please try again.",
      trigger: "userEmail",
    },
    {
      id: "phone",
      message: "What is your phone number?",
      trigger: "userPhone",
    },
    {
      id: "userPhone",
      user: true,
      trigger: "parsePhone",
    },
    {
      id: "parsePhone",
      component: (
        <PhoneParser
          triggerNextStep={handleNext}
          updateFormData={(value) => updateFormData("phone", value)}
        />
      ),
      waitAction: true,
      trigger: ({ value }) => (value === "invalid" ? "invalidPhone" : "end"),
    },
    {
      id: "invalidPhone",
      message: "Invalid phone number, please try again.",
      trigger: "userPhone",
    },
    {
      id: "end",
      message: "Thanks for providing the information!",
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} style={{ color: "black" }} />
    </ThemeProvider>
  );
};

export default App;
