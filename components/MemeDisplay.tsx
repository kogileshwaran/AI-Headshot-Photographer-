
import React from 'react';

interface MemeDisplayProps {
  imageUrl: string | null;
  caption: string;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ imageUrl, caption }) => {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="relative w-full max-w-lg mx-auto shadow-2xl rounded-lg overflow-hidden">
      <img src={imageUrl} alt="Meme" className="w-full h-auto block" />
      {caption && (
        <div
          className="absolute bottom-4 left-4 right-4 p-2 text-center text-white font-bold text-2xl md:text-3xl"
          style={{
            textShadow: '2px 2px 4px #000000, -2px -2px 4px #000000, 2px -2px 4px #000000, -2px 2px 4px #000000',
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            WebkitTextStroke: '1px black',
          }}
        >
          {caption.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default MemeDisplay;
