
import React from 'react';
import Spinner from './Spinner';

interface MagicCaptionPanelProps {
  onGenerate: () => void;
  suggestions: string[];
  onSelect: (caption: string) => void;
  isLoading: boolean;
}

const MagicCaptionPanel: React.FC<MagicCaptionPanelProps> = ({ onGenerate, suggestions, onSelect, isLoading }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Magic Caption</h3>
      <p className="text-gray-400 mb-6">Let AI analyze your image and suggest funny captions.</p>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading && suggestions.length === 0 ? <Spinner /> : '✨ Generate 5 Captions'}
      </button>

      {suggestions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Click a caption to add it:</h4>
          <div className="flex flex-col space-y-2">
            {suggestions.map((caption, index) => (
              <button
                key={index}
                onClick={() => onSelect(caption)}
                className="text-left p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                {caption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MagicCaptionPanel;
