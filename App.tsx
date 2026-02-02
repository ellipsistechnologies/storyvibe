
import React, { useState, useCallback, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { AppStatus, Storyboard } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StoryboardDisplay from './components/StoryboardDisplay';
import VideoPlayer from './components/VideoPlayer';
import LoadingScreen from './components/LoadingScreen';
import ErrorMessage from './components/ErrorMessage';
import ApiKeyGuard from './components/ApiKeyGuard';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [image, setImage] = useState<string | null>(null);
  const [storyboard, setStoryboard] = useState<Storyboard | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [hasApiKey, setHasApiKey] = useState(false);

  const handleImageUpload = (base64: string) => {
    setImage(base64);
    generateStoryboard(base64);
  };

  const generateStoryboard = async (base64Image: string) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze this image and create a 3-step cinematic storyboard for a short 5-second video. 
      The storyboard should describe an evolution or action starting from this scene.
      Return the response in JSON format.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { text: prompt },
              { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    visualPrompt: { type: Type.STRING, description: 'Detailed prompt for video generation tools' }
                  },
                  required: ['title', 'description', 'visualPrompt']
                }
              },
              videoPrompt: { type: Type.STRING, description: 'A single synthesized prompt for the entire 5s animation sequence' }
            },
            required: ['title', 'steps', 'videoPrompt']
          }
        }
      });

      const result = JSON.parse(response.text);
      setStoryboard(result);
      setStatus(AppStatus.STORYBOARD_READY);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate storyboard. Please try a different image.");
      setStatus(AppStatus.ERROR);
    }
  };

  const generateVideo = async () => {
    if (!storyboard || !image) return;

    setStatus(AppStatus.GENERATING_VIDEO);
    setError(null);

    try {
      // Re-initialize to ensure we have the selected key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const base64Data = image.split(',')[1];
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: storyboard.videoPrompt,
        image: {
          imageBytes: base64Data,
          mimeType: 'image/jpeg',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed - no URI returned.");

      const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await videoResponse.blob();
      const url = URL.createObjectURL(blob);
      
      setVideoUrl(url);
      setStatus(AppStatus.VIDEO_READY);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key issue detected. Please re-select your key.");
        setHasApiKey(false);
      } else {
        setError("Video generation failed. Veo might be busy or the prompt was blocked.");
      }
      setStatus(AppStatus.ERROR);
    }
  };

  const reset = () => {
    setImage(null);
    setStoryboard(null);
    setVideoUrl(null);
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  if (!hasApiKey) {
    return <ApiKeyGuard onKeySelected={() => setHasApiKey(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <Header onReset={reset} />
      
      <main className="w-full max-w-4xl mt-8 flex-grow">
        {status === AppStatus.IDLE && (
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Animate Your Imagination</h2>
              <p className="text-slate-400">
                Upload a photo and let our AI create a cinematic sequence. 
                We'll turn your static image into a living story using Gemini and Veo.
              </p>
            </div>
            <ImageUploader onUpload={handleImageUpload} />
          </div>
        )}

        {status === AppStatus.ANALYZING && (
          <LoadingScreen message="Analyzing scene and writing your story..." />
        )}

        {(status === AppStatus.STORYBOARD_READY || status === AppStatus.GENERATING_VIDEO) && storyboard && (
          <div className="space-y-8 pb-12">
            <StoryboardDisplay 
              storyboard={storyboard} 
              image={image!} 
              onGenerate={generateVideo}
              isLoading={status === AppStatus.GENERATING_VIDEO}
              aspectRatio={aspectRatio}
              onSetAspectRatio={setAspectRatio}
            />
            {status === AppStatus.GENERATING_VIDEO && (
              <LoadingScreen message="Dreaming up your video frames... This may take a minute." />
            )}
          </div>
        )}

        {status === AppStatus.VIDEO_READY && videoUrl && (
          <VideoPlayer videoUrl={videoUrl} onReset={reset} />
        )}

        {status === AppStatus.ERROR && (
          <ErrorMessage message={error || "An unexpected error occurred."} onRetry={reset} />
        )}
      </main>

      <footer className="mt-auto py-6 text-slate-500 text-sm">
        Powered by Google Gemini & Veo 3.1
      </footer>
    </div>
  );
};

export default App;
