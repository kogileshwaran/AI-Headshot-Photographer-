
import React from 'react';
import Spinner from './Spinner';

interface ImageAnalyzerPanelProps {
  onAnalyze: () => void;
  analysis: string;
  isLoading: boolean;
}

const ImageAnalyzerPanel: React.FC<ImageAnalyzerPanelProps> = ({ onAnalyze, analysis, isLoading }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Image Analyzer</h3>
      <p className="text-gray-400 mb-6">Get a detailed description of the image content from AI.</p>
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading && !analysis ? <Spinner /> : 'Analyze Image'}
      </button>

      {analysis && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h4 className="font-semibold mb-2 text-gray-200">AI Analysis:</h4>
          <p className="text-gray-300 whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzerPanel;
