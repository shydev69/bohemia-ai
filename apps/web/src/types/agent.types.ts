export interface VoiceAgent {
  id: string;
  userId: string;
  name: string;
  description?: string;
  instructions: string;
  isActive: boolean;
  status: "draft" | "active" | "inactive";

  // LLM Configuration
  llmProvider: "openai";
  llmModel: string;
  llmTemperature: number;
  llmMaxTokens: number;
  llmSettings?: Record<string, unknown>;

  // STT Configuration
  sttProvider: "deepgram";
  sttModel: string;
  sttLanguage: string;
  sttSettings?: {
    detectLanguage?: boolean;
    enableDiarization?: boolean;
    sampleRate?: number;
    channels?: number;
    interimResults?: boolean;
    additionalVocabulary?: string[];
  };

  // TTS Configuration
  ttsProvider: "elevenlabs";
  ttsVoice: string;
  ttsModel?: string;
  ttsSettings?: {
    speed?: number;
    stability?: number;
    similarityBoost?: number;
    style?: number;
    useSpeakerBoost?: boolean;
    instructions?: string;
  };

  // Audio Configuration
  audioSettings: {
    sampleRate?: number;
    channels?: 1 | 2;
    frameLength?: number;
    noiseFilter?: boolean;
    echoCancellation?: boolean;
  };

  // Turn Detection & VAD
  turnDetection: "vad" | "stt" | "realtime_llm" | "manual" | "multilingual";
  vadSettings?: {
    provider?: "silero" | "webrtcvad";
    threshold?: number;
    minSpeechDuration?: number;
    maxSpeechDuration?: number;
  };

  // Interruption Handling
  allowInterruptions: boolean;
  minInterruptionDuration: number;
  resumeFalseInterruption: boolean;
  falseInterruptionTimeout: number;

  // Response Generation
  preemptiveGeneration: boolean;
  minEndpointingDelay: number;
  maxEndpointingDelay: number;
  maxToolSteps: number;

  // Session Management
  userAwayTimeout: number;
  sessionTimeout: number;

  // Function Calling
  functionCalls: {
    enabled: boolean;
    tools: Array<{
      name: string;
      description: string;
      parameters: Record<string, unknown>;
      implementation?: string;
    }>;
  };

  // Background Audio
  backgroundAudio: {
    enabled: boolean;
    ambientSound?: {
      source: string;
      volume: number;
    };
    thinkingSounds?: Array<{
      source: string;
      volume: number;
      probability: number;
    }>;
  };

  // Performance
  targetLatency: number;

  // LiveKit Cloud Integration
  livekitAgentName?: string; // e.g., CA_E2Fk4oUhfSGD

  // Metadata
  createdAt: string;
  updatedAt: string;

  // Additional fields from API response
  sessionCount?: number;
  recentSessions?: AgentSession[];
}

export interface AgentSession {
  id: string;
  agentId: string;
  sessionId: string;
  roomName?: string;
  userId?: string;
  status: "active" | "completed" | "failed" | "terminated";
  avgLatency?: number;
  totalDuration?: number;
  messageCount: number;
  errorCount: number;
  metadata?: Record<string, unknown>;
  startedAt: string;
  endedAt?: string;
  createdAt: string;
}

export interface AgentMessage {
  id: string;
  sessionId: string;
  role: "user" | "assistant" | "system";
  content: string;
  audioUrl?: string;
  latency?: number;
  processingTime?: number;
  sttData?: Record<string, unknown>;
  llmData?: Record<string, unknown>;
  ttsData?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface CreateAgentRequest {
  name: string;
  description?: string;
  instructions: string;
  llmProvider?: "openai";
  llmModel: string;
  llmTemperature?: number;
  llmMaxTokens?: number;
  llmSettings?: Record<string, unknown>;
  sttProvider?: "deepgram";
  sttModel?: string;
  sttLanguage?: string;
  sttSettings?: object;
  ttsProvider?: "elevenlabs";
  ttsVoice: string;
  ttsModel?: string;
  ttsSettings?: object;
  audioSettings?: object;
  turnDetection?: "vad" | "stt" | "realtime_llm" | "manual" | "multilingual";
  vadSettings?: object;
  allowInterruptions?: boolean;
  minInterruptionDuration?: number;
  resumeFalseInterruption?: boolean;
  falseInterruptionTimeout?: number;
  preemptiveGeneration?: boolean;
  minEndpointingDelay?: number;
  maxEndpointingDelay?: number;
  maxToolSteps?: number;
  userAwayTimeout?: number;
  sessionTimeout?: number;
  functionCalls?: object;
  backgroundAudio?: object;
  targetLatency?: number;
  livekitAgentName?: string;
}

export interface AgentListResponse {
  data: VoiceAgent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface LiveKitSessionResponse {
  sessionId: string;
  roomName: string;
  accessToken: string;
  wsUrl: string;
  livekitAgentName?: string;
  agentConfig: {
    id: string;
    name: string;
    instructions: string;
    llmProvider: string;
    llmModel: string;
    sttProvider: string;
    ttsProvider: string;
    audioSettings: object;
    allowInterruptions: boolean;
    targetLatency: number;
  };
}
