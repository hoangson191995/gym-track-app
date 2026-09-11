// API Client for communicating with GymTrack Backend (Node.js + Supabase PostgreSQL)
const isOnlineDomain = typeof window !== 'undefined' && 
  window.location.hostname !== 'localhost' && 
  window.location.hostname !== '127.0.0.1';

const API_BASE_URL = isOnlineDomain ? '/api/v1' : 'http://localhost:5000/api/v1';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('gymtrack_jwt_token') || '';
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('gymtrack_jwt_token', token);
    } else {
      localStorage.removeItem('gymtrack_jwt_token');
    }
  }

  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) return false;
      const data = await res.json();
      return data.status === 'ok';
    } catch {
      return false;
    }
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers,
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // Auth
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async register(name, email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async getMe() {
    return this.request('/users/me');
  }

  // Exercises
  async getExercises(category = 'all', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    return this.request(`/exercises?${params.toString()}`);
  }

  async getExerciseById(id) {
    return this.request(`/exercises/${id}`);
  }

  // Programs
  async getPrograms() {
    return this.request('/programs');
  }

  // Workouts
  async getWorkouts() {
    return this.request('/workouts');
  }

  async startWorkout(name = 'Today Workout', programId = null) {
    return this.request('/workouts', {
      method: 'POST',
      body: JSON.stringify({ name, program_id: programId }),
    });
  }

  async addExerciseToWorkout(workoutId, exerciseId, order = 1) {
    return this.request(`/workouts/${workoutId}/exercises`, {
      method: 'POST',
      body: JSON.stringify({ exercise_id: exerciseId, exercise_order: order }),
    });
  }

  async logSet(workoutExerciseId, setData) {
    return this.request(`/workout-exercises/${workoutExerciseId}/sets`, {
      method: 'POST',
      body: JSON.stringify(setData),
    });
  }

  async completeWorkout(workoutId, durationSeconds = 3600, notes = '') {
    return this.request(`/workouts/${workoutId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ duration_seconds: durationSeconds, notes }),
    });
  }

  // Stats & Progress
  async getStrengthProgress(exerciseId = 'bench_press') {
    return this.request(`/progress/strength?exercise=${exerciseId}`);
  }

  async getVolumeProgress(timeframe = '1m') {
    return this.request(`/progress/volume?timeframe=${timeframe}`);
  }

  async getGoals() {
    return this.request('/goals');
  }
}

export const api = new ApiClient();
