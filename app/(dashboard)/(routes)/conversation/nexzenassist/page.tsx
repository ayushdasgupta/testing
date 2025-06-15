'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMicrophoneAlt } from "react-icons/fa";

function App() {
  const [searchMsg, setSearchMsg] = useState("Click here to speak");
  const [message, setMessage] = useState("");

  function speak(text: any) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak)
  }

  function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      speak("Good Morning ...")
    } else if (hour > 12 && hour < 17) {
      speak("Good Afternoon ...")
    } else {
      speak("Good Evenining ...")
    }
  }

  useEffect(() => {
    speak("Initializing NexZen Assist");
    wishMe();
    speak("How may I help you?");
  }, []);

  function record() {
    setSearchMsg("Listening...");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;
      setSearchMsg(transcript);
      takeCommand(transcript.toLowerCase());
    }

    recognition.start();
  }

  function takeCommand(message: any) {
    if (message.includes("hi") || message.includes("hello")) {
      speak("Hello , How May I Help You?");
      setMessage("Hello , How May I Help You?");
    }
    else if (message.includes('kaise') || message.includes('kya')) {
      speak("Main Thik Hoon");
      setMessage("Main Thik Hoon");
    }
    else if (message.includes("open google")) {
      window.open("https://google.com", "_blank");
      speak("Opening Google...");
      setMessage("Opening Google...");
    }
    else if (message.includes("open youtube")) {
      window.open("https://youtube.com", "_blank");
      speak("Opening YouTube...");
      setMessage("Opening YouTube...");
    }
    else if (message.includes("open spotify")) {
      window.open("https://spotify.com", "_blank");
      speak("Opening Spotify...");
      setMessage("Opening Spotify...");
    }
    else if (message.includes("open instagram")) {
      window.open("https://instagram.com", "_blank");
      speak("Opening Instagram...");
      setMessage("Opening Instagram...");
    }
    else if (message.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Opening Facebook...");
      setMessage("Opening Facebook...");
    }
    else if (message.includes('prime') || message.includes('president') || message.includes('scientific') || message.includes('recipe') || message.includes('anthem') || message.includes('joke')) {
      const Text = message;
      axios({
        method: "POST",
        url: process.env.NEXT_PUBLIC_CONVO_URL!,
        headers: {
          "Accept": "application/json,text/plain",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          message: Text
        }
      }).then((res) => {
        speak(res.data.content);
        setMessage(res.data.content);
      });
    }
    else if (message.includes('wikipedia')) {
      window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
      const finalText = "This is what I found on Wikipedia regarding " + message;
      speak(finalText);
      setMessage(finalText);
    }
    else if (message.includes('time')) {
      const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
      speak(time);
      setMessage(time);
    }
    else if (message.includes('date')) {
      const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
      speak(date);
      setMessage(date);
    }
    else if (message.includes('calculator')) {
      window.open('Calculator:///');
      speak("Opening Calculator");
      setMessage("Opening Calculator");
    }
    else {
      window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
      const finalText = "I found some information for " + message + " on Google";
      speak(finalText);
      setMessage(finalText);
    }
  }

  return (
    <section className="min-h-screen w-full dark:bg-transparent bg-[#F5F3E3]  px-4 py-8 flex flex-col items-center justify-center font-sans">
      <div className="text-center space-y-4">
        <img
          className="w-72 mx-auto drop-shadow-lg rounded-xl"
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3R3dG81dGtpMXBxb3F5dmZwOGN3emc0ajRzMXAydmp1aTEwMjZ4eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CVtNe84hhYF9u/giphy.gif"
          alt="Assistant Animation"
        />
        <h1 className="text-4xl font-bold text-cyan-400 tracking-widest">NEXZEN ASSIST</h1>
        <p className="text-gray-400 text-lg">I&apos;m NexZen Assist, your Virtual Assistant.</p>
      </div>

      <div className="mt-10 w-full max-w-xl fle bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-500 dark:to-pink-500 dark:text-white text-neutral-700 backdrop-blur rounded-2xl shadow-lg px-6 py-4 flex items-center justify-center gap-4">
        <button
          className="p-3 rounded-full hover:bg-[#3f5757] transition duration-200"
          onClick={record}
        >
          <FaMicrophoneAlt className="text-cyan-200 text-xl" />
        </button>
        <span className="text-cyan-100 text-sm sm:text-base text-left">{searchMsg}</span>
      </div>

      {
        message && <div className="mt-6 w-full max-w-xl px-6 py-4 bg-[#222] dark:bg-[#2b2b2b] rounded-2xl text-cyan-100 shadow-md">
        <p className="text-sm sm:text-base text-black dark:text-white whitespace-pre-wrap">{message}</p>
      </div>
      }
    </section>
  );
}

export default App;
