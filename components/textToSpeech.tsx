"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const VoiceRec = () => {
  const [text, setText] = useState();
  const [confidence, setConfidence] = useState("");
  const [isActive, setIsActive] = useState(false);
  const isSpeechDetected = false;
  const router = useRouter();

  function handleOnRecord() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = async function (event: any) {
      const transcript = event.results[0][0].transcript;

      const confidence =
        (event.results[0][0].confidence * 100).toFixed(2) +
        "% sikkert resultat";

      setText(transcript);
      setConfidence(confidence);
    };

    recognition.onerror = function (event: any) {
      console.error(event.error);
    };

    recognition.onstart = function () {
      setIsActive(true);
    };

    recognition.onend = function () {
      setIsActive(false);
    };

    //This will start the recording
    recognition.start();
  }

  return (
    <div className="mt-12 px-4">
      <div className="max-w-lg rounded-xl overflow-hidden mx-auto">
        <div className="bg-zinc-300 p-4 border-b-4 border-zinc-400">
          <div className="bg-zinc-100 p-4 border-b-4 border-zinc-200 w-1/2 h-12">
            <p className="font-serif font-extrabold tracking-widest">
              Optag din stemme
            </p>
          </div>
        </div>

        <div className="bg-zinc-800 p-4 border-b-4 border-zinc-950">
          <p className="flex items-center gap-3">
            <span
              className={`block rounded-full w-5 h-5 flex-shrink-0 flex-grow-0 ${
                isActive ? "bg-red-500" : "bg-red-900"
              } `}
            >
              <span className="sr-only">
                {isActive ? "Actively recording" : "Not actively recording"}
              </span>
            </span>
            <span
              className={`block rounded w-full h-5 flex-grow-1 ${
                isSpeechDetected ? "bg-green-500" : "bg-green-900"
              }`}
            >
              <span className="sr-only">
                {isSpeechDetected
                  ? "Speech is being recorded"
                  : "Speech is not being recorded"}
              </span>
            </span>
          </p>
        </div>

        <div className="bg-zinc-800 p-4">
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg bg-zinc-200 rounded-lg p-5 mx-auto">
            <p>
              <button
                className={`w-full h-full uppercase font-semibold text-sm  ${
                  isActive
                    ? "text-white bg-red-500"
                    : "text-zinc-400 bg-zinc-900"
                } color-white py-3 rounded-sm`}
                onClick={handleOnRecord}
              >
                {isActive ? "Stop" : "Optag"}
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto mt-12">
        <div className="mb-4">
          <label className="block text-zinc-600 text-[.8rem] uppercase font-bold mb-1">
            Tale til tekst
          </label>
          <textarea
            className="w-full h-20 border border-gray-400 rounded-md p-2"
            value={text}
          ></textarea>{" "}
          <div className="opacity-60">{confidence}</div>
        </div>
        <br />
        <div className="mt-12 m-5 px-4 flex justify-center">
          {/* TODO: Send data with an on click function */}
          <button
            onClick={() => router.push("/diary")}
            className="w-60 h-10 uppercase font-semibold text-m bg-blue-900 text-white"
          >
            Send til dagbog
          </button>
        </div>
        <p>Brug denne knap for at gemme udtalesen. For ny, tryk på optag.</p>
      </div>
    </div>
  );
};
export default VoiceRec;
