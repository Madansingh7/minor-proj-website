import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { readTxtFile } from '../utils/fileReader';

export default function FileUploader({ onFileLoaded, onError, loadedFile }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const processFile = async (file) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.txt')) {
      onError('Invalid file format. Please upload a standard text file (.txt).');
      return;
    }

    try {
      const text = await readTxtFile(file);
      if (!text || !text.trim()) {
        onError('The uploaded file is empty. Please select a valid dataset file.');
        return;
      }
      onFileLoaded({ text, file });
    } catch (err) {
      onError('Failed to parse text file. ' + err.message);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={handleChange}
      />

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`saas-card cursor-pointer border-2 border-dashed transition-all text-center p-8 ${
          dragActive
            ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
            : loadedFile
            ? 'border-emerald-300 bg-emerald-50/30'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
        }`}
      >
        {loadedFile ? (
          <div className="flex items-center justify-center gap-3 text-emerald-800">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
            <div className="text-left">
              <span className="block font-heading font-extrabold text-base text-slate-900">
                {loadedFile.name}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {(loadedFile.size / 1024).toFixed(1)} KB • Text Dataset Ready
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
              <UploadCloud className="w-6 h-6" />
            </div>

            <div>
              <p className="font-heading font-extrabold text-sm text-slate-900">
                Drag and drop your raw dataset TXT file here
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Supports plain text datasets (.txt format up to 50MB)
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <span className="neo-btn neo-btn-white neo-btn-sm text-xs pointer-events-none">
                Browse Files
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
