
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FoodRecognitionResult } from '../types';
import { recognizeFood } from '../services/geminiService';

interface CameraScreenProps {
  onScanComplete: (result: FoodRecognitionResult) => void;
  onClose: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ onScanComplete, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment', width: { ideal: 1080 }, height: { ideal: 1920 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
        setError("Please grant camera access to use the scanner.");
      }
    };
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;
    
    setIsAnalyzing(true);
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    
    const base64Data = canvasRef.current.toDataURL('image/jpeg', 0.8).split(',')[1];
    
    try {
      const result = await recognizeFood(base64Data);
      onScanComplete({ ...result, imageUrl: canvasRef.current.toDataURL('image/jpeg') });
    } catch (err) {
      console.error(err);
      setError("Recognition failed. Try again.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden font-display">
      {/* Camera Viewfinder */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

      {/* Top Controls */}
      <div className="absolute top-0 left-0 w-full z-30 pt-14 pb-4 px-6 flex justify-between items-center text-white">
        <button className="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 active:scale-95">
          <span className="material-symbols-outlined text-[20px]">flash_off</span>
        </button>
        <div className="px-3 py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/5">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/90">AI Scanner</span>
        </div>
        <button onClick={onClose} className="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 active:scale-95">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Focus Area */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {isAnalyzing && (
          <div className="mb-4 animate-[fadeInUp_0.5s_ease-out_forwards]">
            <div className="bg-primary/90 text-white text-[10px] font-bold px-4 py-2 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5 transform translate-y-8">
              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
              <span>ANALYZING...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-4 bg-red-500/80 text-white text-xs px-4 py-2 rounded-lg backdrop-blur-md">{error}</div>
        )}

        <div className="relative size-72 md:size-80">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-2xl shadow-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-2xl shadow-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-2xl shadow-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-2xl shadow-lg" />
          
          <div className="absolute inset-4 border border-white/10 rounded-xl grid grid-cols-3 grid-rows-3">
             <div className="border-r border-white/5" /><div className="border-r border-white/5" /><div />
             <div className="border-t border-r border-white/5" /><div className="border-t border-r border-white/5" /><div className="border-t border-white/5" />
             <div className="border-t border-r border-white/5" /><div className="border-t border-r border-white/5" /><div className="border-t border-white/5" />
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="absolute bottom-0 left-0 w-full z-20 flex flex-col items-center">
        <div className="mb-8 px-6">
          <p className="text-white text-sm font-medium tracking-wide text-center drop-shadow-lg">
            Snap a photo to analyze calories
          </p>
        </div>
        
        <div className="w-full bg-black/20 backdrop-blur-2xl pb-10 pt-6 px-8 rounded-t-[2.5rem] flex items-center justify-between border-t border-white/10">
          <button className="flex flex-col items-center gap-2 group w-16">
            <div className="size-12 rounded-xl overflow-hidden border-2 border-white/20 relative bg-gray-800">
               <img src="https://picsum.photos/seed/last/100/100" className="w-full h-full object-cover opacity-60" />
            </div>
          </button>
          
          <button 
            onClick={captureAndScan}
            disabled={isAnalyzing}
            className="relative group transition-transform active:scale-95 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl group-hover:bg-primary/50 transition-all duration-500" />
            <div className="size-20 rounded-full border-[4px] border-white flex items-center justify-center bg-white/5 backdrop-blur-sm relative z-10">
              <div className="size-[3.75rem] rounded-full bg-primary shadow-inner-light" />
            </div>
          </button>

          <button className="flex flex-col items-center gap-2 group w-16">
            <div className="h-12 w-12 rounded-full border border-white/20 bg-black/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[24px]">restaurant</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraScreen;
