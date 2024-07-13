"use client";
import React, { useState, useEffect } from "react";

const Me = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Initial bot message when the page loads
    const initialBotMessage =
      "Hello, I am PacBot. I can help with your onboarding process. Please state your name?";
    const newMessage = { text: initialBotMessage, isUser: false };
    setMessages([newMessage]);
  }, []);

  const updateFormData = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleSend = () => {
    if (inputText.trim() !== "") {
      const newMessage = { text: inputText, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      handleBotResponse(inputText);
      setInputText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const botResponse = (message) => {
    setTimeout(() => {
      const newMessage = { text: message, isUser: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }, 500); // Simulate bot response delay
  };

  const handleBotResponse = (userInput) => {
    switch (currentStep) {
      case 0: // Name input
        nameParser(userInput);
        break;
      case 1: // Email input
        emailParser(userInput);
        break;
      case 2: // Phone input
        phoneParser(userInput);
        break;
      default:
        break;
    }
  };

  const nameParser = (userInput) => {
    const invalidCharsRegex = /[!@#$%^&*(),.?":{}|<>0-9]/;
    const nameRegex = /^(?:my name is|i am|it's|it is|call me|this is)?\s*(.+?)(?: is my name)?$/i;

    if (invalidCharsRegex.test(userInput)) {
      botResponse(
        "Invalid name, please try again. Only letters and spaces are allowed."
      );
    } else {
      const match = userInput?.match(nameRegex);
      let nameValue = "";

      if (match && match[1]) {
        nameValue = match[1].trim();
      } else if (/^[a-zA-Z\s]+$/.test(userInput)) {
        nameValue = userInput;
      } else {
        botResponse(
          "Invalid name, please try again. Only letters and spaces are allowed."
        );
        return;
      }

      updateFormData("name", nameValue);
      botResponse(`Welcome ${nameValue}! What is your email?`);
      setCurrentStep(currentStep + 1);
    }
  };

  const emailParser = (userInput) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(userInput)) {
      updateFormData("email", userInput);
      botResponse("What is your phone number?");
      setCurrentStep(currentStep + 1);
    } else {
      botResponse("Invalid email, please try again.");
    }
  };

  const phoneParser = (userInput) => {
    const phoneRegex = /^\+?(\d.*){3,}$/; // Simple regex to check if the input has at least 3 digits

    if (phoneRegex.test(userInput)) {
      updateFormData("phone", userInput);
      botResponse("Thanks for providing the information!");
      setCurrentStep(currentStep + 1);
    } else {
      botResponse("Invalid phone number, please try again.");
    }
  };

  return (
    <div className="bg-gray-100 w-full max-w-lg mx-auto  p-5 border border-gray-300 rounded-lg">
      <div className="space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message.isUser
                  ? "bg-orange-600 text-white"
                  : "bg-white text-black"
              } p-3 rounded-lg inline-block max-w-xs`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-[4rem]">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg text-black"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-orange-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Me;
