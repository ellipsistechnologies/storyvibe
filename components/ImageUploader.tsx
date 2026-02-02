
import React, { useState } from 'react';

interface ImageUploaderProps {
  onUpload: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <label 
        className={`relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
          dragActive 
            ? "border-sky-500 bg-sky-500/10 scale-[1.02]" 
            : "border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600"
        }`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-cloud-upload-alt text-2xl text-sky-400"></i>
          </div>
          <p className="mb-2 text-lg font-semibold">Click to upload or drag and drop</p>
          <p className="text-sm text-slate-400">PNG, JPG or JPEG (Max 10MB)</p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={onChange}
        />
      </label>
      
      <div className="mt-8 grid grid-cols-2 gap-4 text-center opacity-60">
        <div className="p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <i className="fas fa-magic text-sky-400 mb-2"></i>
          <span className="text-xs uppercase tracking-widest font-bold">Step 1</span>
          <p className="text-xs text-slate-400">AI Storyboarding</p>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <i className="fas fa-bolt text-indigo-400 mb-2"></i>
          <span className="text-xs uppercase tracking-widest font-bold">Step 2</span>
          <p className="text-xs text-slate-400">Veo Animation</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
