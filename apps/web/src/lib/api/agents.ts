import {
  VoiceAgent,
  CreateAgentRequest,
  AgentListResponse,
  LiveKitSessionResponse,
} from "@/types/agent.types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export class AgentsAPI {
  private async request<T>(
    endpoint: string,
    options?: {
      method?: string;
      body?: object;
      params?: Record<string, string | number | undefined>;
      authToken?: string;
    }
  ): Promise<T> {
    const url = new URL(`${API_BASE}/agents${endpoint}`);

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (options?.authToken) {
      headers.Authorization = `Bearer ${options.authToken}`;
    }

    const response = await fetch(url.toString(), {
      method: options?.method || "GET",
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${error}`);
    }

    return response.json();
  }

  async list(
    params?: {
      page?: number;
      limit?: number;
      search?: string;
      status?: "draft" | "active" | "inactive";
      provider?: "cerebras" | "openai" | "anthropic" | "google" | "groq";
    },
    authToken?: string
  ): Promise<AgentListResponse> {
    return this.request<AgentListResponse>("", { params, authToken });
  }

  async get(id: string, authToken?: string): Promise<VoiceAgent> {
    return this.request<VoiceAgent>(`/${id}`, { authToken });
  }

  async create(
    data: CreateAgentRequest,
    authToken?: string
  ): Promise<VoiceAgent> {
    return this.request<VoiceAgent>("", {
      method: "POST",
      body: data,
      authToken,
    });
  }

  async update(
    id: string,
    data: Partial<CreateAgentRequest>,
    authToken?: string
  ): Promise<VoiceAgent> {
    return this.request<VoiceAgent>(`/${id}`, {
      method: "PUT",
      body: data,
      authToken,
    });
  }

  async delete(id: string, authToken?: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/${id}`, {
      method: "DELETE",
      authToken,
    });
  }

  async test(
    id: string,
    authToken?: string
  ): Promise<{
    sessionId: string;
    roomName: string;
    agentConfig: object;
  }> {
    return this.request<{
      sessionId: string;
      roomName: string;
      agentConfig: object;
    }>(`/${id}/test`, {
      method: "POST",
      authToken,
    });
  }
}

export class LiveKitAPI {
  private async request<T>(
    endpoint: string,
    options?: {
      method?: string;
      body?: object;
      authToken?: string;
    }
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (options?.authToken) {
      headers.Authorization = `Bearer ${options.authToken}`;
    }

    const response = await fetch(`${API_BASE}/livekit${endpoint}`, {
      method: options?.method || "GET",
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LiveKit API Error: ${error}`);
    }

    return response.json();
  }

  async createSession(
    agentId: string,
    userId?: string,
    authToken?: string
  ): Promise<LiveKitSessionResponse> {
    return this.request<LiveKitSessionResponse>("/create-session", {
      method: "POST",
      body: {
        agentId,
        userId,
        isTest: true,
      },
      authToken,
    });
  }

  async endSession(
    sessionId: string,
    authToken?: string
  ): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/sessions/${sessionId}`, {
      method: "DELETE",
      authToken,
    });
  }

  async getSessionMetrics(sessionId: string, authToken?: string): Promise<any> {
    return this.request(`/sessions/${sessionId}/metrics`, { authToken });
  }
}

export const agentsAPI = new AgentsAPI();
export const liveKitAPI = new LiveKitAPI();
