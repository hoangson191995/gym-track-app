import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'https://gym-track-app-xi.vercel.app/api/v1';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  unit_weight: string;
  unit_distance: string;
  current_streak: number;
  longest_streak: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscle_group: string;
  secondary_muscles: string[];
  equipment: string;
  difficulty: string;
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  rpe: number;
  setType: 'N' | 'W' | 'D' | 'F' | 'S';
  completed: boolean;
}

class MobileApiClient {
  private token: string | null = null;

  async init() {
    try {
      this.token = await AsyncStorage.getItem('gymtrack_jwt_token');
    } catch {
      this.token = null;
    }
  }

  async setToken(token: string | null) {
    this.token = token;
    if (token) {
      await AsyncStorage.setItem('gymtrack_jwt_token', token);
    } else {
      await AsyncStorage.removeItem('gymtrack_jwt_token');
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) return false;
      const data = await res.json();
      return data.status === 'ok';
    } catch {
      return false;
    }
  }

  async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  }

  async login(email = 'alexnguyen@gmail.com', password = 'password123') {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      await this.setToken(data.token);
    }
    return data;
  }

  async getMe(): Promise<{ user: User }> {
    return this.request('/users/me');
  }

  async getExercises(category = 'all', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    return this.request(`/exercises?${params.toString()}`);
  }

  async getPrograms() {
    return this.request('/programs');
  }

  async startWorkout(name = 'Push Day (Mobile)', programId?: string) {
    return this.request('/workouts', {
      method: 'POST',
      body: JSON.stringify({ name, program_id: programId }),
    });
  }

  async addExerciseToWorkout(workoutId: string, exerciseId: string, order = 1) {
    return this.request(`/workouts/${workoutId}/exercises`, {
      method: 'POST',
      body: JSON.stringify({ exercise_id: exerciseId, exercise_order: order }),
    });
  }

  async logSet(workoutExerciseId: string, setData: {
    set_number: number;
    set_type: string;
    weight: number;
    reps: number;
    rpe: number;
    completed: boolean;
  }) {
    return this.request(`/workout-exercises/${workoutExerciseId}/sets`, {
      method: 'POST',
      body: JSON.stringify(setData),
    });
  }

  async completeWorkout(workoutId: string, durationSeconds = 3600, notes = '') {
    return this.request(`/workouts/${workoutId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ duration_seconds: durationSeconds, notes }),
    });
  }
}

export const mobileApi = new MobileApiClient();
