
import React, { useState, useCallback } from 'react';
import { AppMode } from './types';
import { generateCaptions, editImage, analyzeImage } from './services/geminiService';
import { fileToBase64, urlToBase64 } from './utils/fileUtils';
import Header from './components/Header';
import ImageSelector from './components/ImageSelector';
import MemeDisplay from './components/MemeDisplay';
import ControlTabs from './components/ControlTabs';
import MagicCaptionPanel from './components/MagicCaptionPanel';
import ImageEditorPanel from './components/ImageEditorPanel';
import ImageAnalyzerPanel from './components/ImageAnalyzerPanel';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [suggestedCaptions, setSuggestedCaptions] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appMode, setAppMode] = useState<AppMode>(AppMode.Generator);

  const resetState = () => {
    setCaption('');
    setSuggestedCaptions([]);
    setAnalysis('');
    setError(null);
  };

  const handleImageSelect = useCallback(async (source: File | string) => {
    setIsLoading(true);
    resetState();
    try {
      let base64: string;
      let mimeType: string;

      if (typeof source === 'string') {
        const result = await urlToBase64(source);
        base64 = result.base64;
        mimeType = result.mimeType;
      } else {
        const result = await fileToBase64(source);
        base64 = result.base64;
        mimeType = result.mimeType;
      }
      
      setImage(base64);
      setImageMimeType(mimeType);

    } catch (err) {
      setError('Failed to load image. Please try another one.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGenerateCaptions = useCallback(async () => {
    if (!image || !imageMimeType) return;
    setIsLoading(true);
    setError(null);
    setSuggestedCaptions([]);
    try {
      const captions = await generateCaptions(image, imageMimeType);
      setSuggestedCaptions(captions);
    } catch (err) {
      setError('Failed to generate captions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [image, imageMimeType]);

  const handleEditImage = useCallback(async (prompt: string) => {
    if (!image || !imageMimeType) return;
    setIsLoading(true);
    setError(null);
    try {
      const { newImageBase64, newMimeType } = await editImage(image, imageMimeType, prompt);
      setImage(newImageBase64);
      setImageMimeType(newMimeType);
      resetState();
    } catch (err) {
      setError('Failed to edit image. The model may have content policy restrictions.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [image, imageMimeType]);

  const handleAnalyzeImage = useCallback(async () => {
    if (!image || !imageMimeType) return;
    setIsLoading(true);
    setError(null);
    setAnalysis('');
    try {
      const result = await analyzeImage(image, imageMimeType);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [image, imageMimeType]);

  const renderPanel = () => {
    switch (appMode) {
      case AppMode.Generator:
        return (
          <MagicCaptionPanel
            onGenerate={handleGenerateCaptions}
            suggestions={suggestedCaptions}
            onSelect={setCaption}
            isLoading={isLoading}
          />
        );
      case AppMode.Editor:
        return <ImageEditorPanel onEdit={handleEditImage} isLoading={isLoading} />;
      case AppMode.Analyzer:
        return <ImageAnalyzerPanel onAnalyze={handleAnalyzeImage} analysis={analysis} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!image ? (
          <ImageSelector onImageSelect={handleImageSelect} isLoading={isLoading} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <MemeDisplay imageUrl={`data:${imageMimeType};base64,${image}`} caption={caption} />
              <button
                onClick={() => {
                  setImage(null);
                  resetState();
                }}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Choose a different image
              </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <ControlTabs currentMode={appMode} setMode={setAppMode} />
              {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-md my-4">{error}</div>}
              {renderPanel()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
