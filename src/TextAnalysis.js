import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiRefreshCw, FiBook, FiType } from 'react-icons/fi';

const TextAnalysis = () => {
  const [text, setText] = useState('');
  const [uniqueWords, setUniqueWords] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    // Count unique words
    const words = text ? text.toLowerCase().match(/\b[\w']+\b/g) || [] : [];
    setUniqueWords(new Set(words).size);

    // Count characters (excluding spaces and punctuation)
    setCharacterCount(text ? text.replace(/[^a-zA-Z0-9]/g, '').length : 0);
  }, [text]);

  const handleReplace = () => {
    if (!searchString || !text) return;

    const newText = text.replace(new RegExp(searchString, 'g'), replaceString);
    setText(newText);

    // Highlight replaced words in textarea
    if (textareaRef.current) {
      const html = newText.replace(
        new RegExp(replaceString, 'g'),
        `<mark class="bg-yellow-200">${replaceString}</mark>`
      );
      textareaRef.current.innerHTML = html;
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.innerText || '';
    setText(newText);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Real-Time Text Analysis</h1>
      
      <div className="mb-6">
        <div 
          ref={textareaRef}
          contentEditable
          className="w-full h-48 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto"
          onInput={handleTextChange}
          placeholder="Type or paste your text here..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
          <FiBook className="text-blue-500 mr-2" />
          <span className="text-gray-700">Unique Words: {uniqueWords}</span>
        </div>
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
          <FiType className="text-blue-500 mr-2" />
          <span className="text-gray-700">Character Count: {characterCount}</span>
        </div>
      </div>

      <div className="flex mb-4 space-x-2">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <input
              id="search"
              type="text"
              className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              placeholder="Search string"
            />
            <FiSearch className="absolute left-2 top-3 text-gray-400" />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="replace" className="block text-sm font-medium text-gray-700 mb-1">Replace</label>
          <input
            id="replace"
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={replaceString}
            onChange={(e) => setReplaceString(e.target.value)}
            placeholder="Replace string"
          />
        </div>
      </div>

      <button
        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
        onClick={handleReplace}
      >
        <FiRefreshCw className="mr-2" />
        Replace All
      </button>
    </div>
  );
};

export default TextAnalysis;