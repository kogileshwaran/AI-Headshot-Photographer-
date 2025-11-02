
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md py-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI Meme Generator
        </h1>
        <p className="text-gray-400 mt-1">Create, Edit, and Analyze with the power of Gemini</p>
      </div>
    </header>
  );
};

export default Header;
