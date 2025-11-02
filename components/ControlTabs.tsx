
import React from 'react';
import { AppMode } from '../types';

interface ControlTabsProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const ControlTabs: React.FC<ControlTabsProps> = ({ currentMode, setMode }) => {
  const modes = [AppMode.Generator, AppMode.Editor, AppMode.Analyzer];

  return (
    <div className="flex border-b border-gray-700 mb-6">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => setMode(mode)}
          className={`px-4 py-2 font-semibold text-sm transition-colors duration-200 focus:outline-none ${
            currentMode === mode
              ? 'border-b-2 border-purple-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

export default ControlTabs;
