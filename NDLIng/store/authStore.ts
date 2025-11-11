import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  rut: string;
  email: string;
  isAuthenticated: boolean;
  setRutStore: (rut: string) => void;
  setEmailStore: (email: string) => void;
  setAuthenticated: (auth: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      rut: '',
      email: '',
      isAuthenticated: false,
      setRutStore: (rut: string) => set({ rut }),
      setEmailStore: (email: string) => set({ email }),
      setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      clearAuth: () => set({ rut: '', email: '', isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);