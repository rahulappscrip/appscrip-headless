import React from "react";

const HeroSubscribeForm: React.FC = () => (
  <form className="flex flex-col items-center w-full max-w-xl mx-auto mb-2">
    <div className="flex w-full">
      <input
        type="email"
        placeholder="enter your email address"
        className="flex-grow rounded-l-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-gray-800"
        required
      />
      <button
        type="submit"
        className="rounded-r-md bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
      >
        Subscribe
      </button>
    </div>
    <label className="flex items-center mt-3 text-gray-500 text-sm">
      <input type="checkbox" className="mr-2" />
      Stay ahead of AI trends with our weekly updates to your inbox
    </label>
  </form>
);

export default HeroSubscribeForm; 