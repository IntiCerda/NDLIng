import { create } from "zustand";

interface ReportFormState {
  title: string;
  description: string;
  severity: 1 | 2 | 3;
  photo: string | null;
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  setField: (field: string, value: any) => void;
  setLocation: (lat: number, lng: number) => void;
  reset: () => void;
}

export const useReportStore = create<ReportFormState>((set) => ({
  title: "",
  description: "",
  severity: 2,
  photo: null,

  location: {
    latitude: null,
    longitude: null,
  },

  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  setLocation: (latitude, longitude) =>
    set((state) => ({
      ...state,
      location: { latitude, longitude },
    })),

  reset: () =>
    set({
      title: "",
      description: "",
      severity: "Medio",
      photo: null,
      location: {
        latitude: null,
        longitude: null,
      },
    }),
}));

