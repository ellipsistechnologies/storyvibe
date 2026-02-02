
export interface StoryStep {
  title: string;
  description: string;
  visualPrompt: string;
}

export interface Storyboard {
  title: string;
  steps: StoryStep[];
  videoPrompt: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  STORYBOARD_READY = 'STORYBOARD_READY',
  GENERATING_VIDEO = 'GENERATING_VIDEO',
  VIDEO_READY = 'VIDEO_READY',
  ERROR = 'ERROR'
}

// Define the AIStudio interface to match the expected global type name.
export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    // Using the named AIStudio interface and matching common global modifiers.
    aistudio: AIStudio;
  }
}
