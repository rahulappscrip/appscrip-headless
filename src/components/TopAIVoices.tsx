"use client";
import React, { useState } from "react";

const voices = [
  {
    name: "Rahul Sharma",
    username: "@Rahul Sharma",
    description: "Currently the CEO & CTO of Appscrip (3Embed Software Tech Pvt Ltd ).",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    profile: "#"
  },
  {
    name: "Rahul Sharma",
    username: "@Rahul Sharma",
    description: "Currently the CEO & CTO of Appscrip (3Embed Software Tech Pvt Ltd ).",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    profile: "#"
  },
  {
    name: "Rahul Sharma",
    username: "@Rahul Sharma",
    description: "Currently the CEO & CTO of Appscrip (3Embed Software Tech Pvt Ltd ).",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    profile: "#"
  },
  {
    name: "Rahul Sharma",
    username: "@Rahul Sharma",
    description: "Currently the CEO & CTO of Appscrip (3Embed Software Tech Pvt Ltd ).",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    profile: "#"
  }
];

export default function TopAIVoices() {
  const [start, setStart] = useState(0);
  const visible = 4;
  const canPrev = voices.length > visible;
  const canNext = voices.length > visible;

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Top AI Voices</h2>
        <div className="flex space-x-2">
          <button
            onClick={() =>
              setStart((s) =>
                s === 0 ? voices.length - visible : s - 1
              )
            }
            disabled={!canPrev}
            className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-black text-2xl ${!canPrev ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            aria-label="Previous voices"
          >
            <span>&#x25C0;</span>
          </button>
          <button
            onClick={() =>
              setStart((s) =>
                s + visible >= voices.length ? 0 : s + 1
              )
            }
            disabled={!canNext}
            className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-black text-2xl ${!canNext ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            aria-label="Next voices"
          >
            <span>&#x25B6;</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {voices.slice(start, start + visible).map((voice, idx) => (
          <div key={idx} className="bg-white rounded shadow border flex flex-col overflow-hidden">
            <img src={voice.image} alt={voice.name} className="w-full h-56 object-cover" />
            <div className="p-4 flex-1 flex flex-col">
              <div className="font-bold text-lg mb-1">{voice.username}</div>
              <div className="text-gray-600 mb-4">{voice.description}</div>
              <div className="mt-auto">
                <a
                  href={voice.profile}
                  className="block w-full text-center bg-blue-700 text-white font-semibold py-2 rounded border border-blue-700 hover:bg-blue-800 transition-colors"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 