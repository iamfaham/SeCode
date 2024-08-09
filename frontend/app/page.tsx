'use client'
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';

export default function Home() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true); // State for modal visibility

  const handleCodeChange = (event: any) => {
    setCode(event.target.value);
  };

  const handleAnalyzeCode = async () => {
    setLoading(true); // Start loading
    setOutput(''); // Clear previous output
    try {
      const response = await fetch('https://secode-backend.onrender.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data.suggestions);
      } else {
        setOutput('Error analyzing code.');
      }
    } catch (error) {
      setOutput('Error analyzing code.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="mb-4">
              Hi, I&apos;m Syed Mohammed Faham, a Full Stack Developer. 
              This code is just a test website for the backend of 
              SeCode: the VScode extension for checking security flaws in your code.
              For any feedback or suggestions, contact me at <Link href="https://www.linkedin.com/in/iamfaham" className='underline italic'>LinkedIn</Link>.
            </p>
            <div className="flex justify-end"> 
              <button 
                onClick={closeModal}
                className="py-2 px-4 bg-slate-700 text-white rounded hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="text-center py-4 text-white text-2xl">
        SeCode: Code Security Analyzer
      </header>
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-96 md:h-full p-4 flex flex-col">
          <textarea
            value={code}
            onChange={handleCodeChange}
            placeholder="Paste your code here..."
            className="flex-grow p-4 bg-slate-800 text-white rounded border border-slate-400 resize-none mb-4"
          />
          <button 
            onClick={handleAnalyzeCode}
            className="py-2 px-4 bg-slate-700 text-white rounded hover:bg-gray-800 transition-colors"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Analyzing...' : 'Analyze Code'} 
          </button>
        </div>
        <div className="w-full md:w-1/2 h-96 md:h-full p-4 overflow-y-auto bg-black mt-4 md:mt-0">
          <pre className="whitespace-pre-wrap font-mono w-full h-full bg-slate-800 rounded border border-slate-400 text-white p-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <ClipLoader color="#ffffff" loading={loading} size={50} />
              </div>
            ) : (
              output ? output : <p className="text-gray-400">Output will show up here...</p>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
