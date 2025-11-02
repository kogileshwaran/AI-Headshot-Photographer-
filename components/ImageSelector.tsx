
import React, { useRef } from 'react';
import { MEME_TEMPLATES } from '../constants';

interface ImageSelectorProps {
  onImageSelect: (file: File | string) => void;
  isLoading: boolean;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Get Started</h2>
      <p className="text-gray-400 mb-8">Upload your own image or select a popular template below.</p>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        disabled={isLoading}
      />
      <button
        onClick={handleUploadClick}
        disabled={isLoading}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 disabled:bg-purple-900 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : 'Upload an Image'}
      </button>

      <div className="my-8 text-gray-500">OR</div>

      <h3 className="text-2xl font-bold mb-6">Choose a Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MEME_TEMPLATES.map((template) => (
          <div key={template.name} className="group cursor-pointer" onClick={() => !isLoading && onImageSelect(template.url)}>
            <img
              src={template.url}
              alt={template.name}
              className="rounded-lg w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <p className="mt-2 text-sm text-gray-300 group-hover:text-white transition-colors">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
