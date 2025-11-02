
import React, { useState } from 'react';
import Spinner from './Spinner';

interface ImageEditorPanelProps {
  onEdit: (prompt: string) => void;
  isLoading: boolean;
}

const ImageEditorPanel: React.FC<ImageEditorPanelProps> = ({ onEdit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onEdit(prompt);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Image Editor</h3>
      <p className="text-gray-400 mb-6">Describe the changes you want to make. For example: "Add a retro filter" or "Make the background black and white".</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Add a birthday hat to the cat"
          className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          rows={3}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : 'Apply Edit'}
        </button>
      </form>
    </div>
  );
};

export default ImageEditorPanel;
