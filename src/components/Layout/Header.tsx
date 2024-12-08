import React from 'react';

export function Header() {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center mb-6">
        <img 
          src="/verbatix-logo.svg" 
          alt="Verbatix Logo" 
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Verbatix
        </h1>
        <p className="mt-2 text-gray-600">Transform your text into natural-sounding speech</p>
      </div>
    </div>
  );
}