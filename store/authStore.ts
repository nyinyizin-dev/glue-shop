import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  isLoggedIn: boolean; // for login
  isOtpScreen: boolean;
  isPasswordScreen: boolean;
  _hasHydrated: boolean; // for splash screen
  accessToken: string | null;
  refreshToken: string | null;
  randomToken: string | null;
  phone: string | null;
  token: string | null;
};

type Actions = {
  login: (token: {
    accessToken: string;
    refreshToken: string;
    randomToken: string;
  }) => void;
  setOtpScreen: (phone: string, token: string) => void;
  setPasswordScreen: (token: string) => void;
  logout: () => void;
  setHyasHydrated: (value: boolean) => void;
};

const initialState: State = {
  isLoggedIn: false,
  isOtpScreen: false,
  isPasswordScreen: false,
  _hasHydrated: false,
  accessToken: null,
  refreshToken: null,
  randomToken: null,
  phone: null,
  token: null,
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      login: ({ accessToken, refreshToken, randomToken }) =>
        set((state) => ({
          ...state,
          isLoggedIn: true,
          isOtpScreen: false,
          isPasswordScreen: false,
          accessToken,
          refreshToken,
          randomToken,
        })),
      setOtpScreen: (phone, token) =>
        set((state) => ({ ...state, isOtpScreen: true, phone, token })),
      setPasswordScreen: (token) =>
        set((state) => ({ ...state, isPasswordScreen: true, token })),
      logout: () => set((state) => ({ ...state, isLoggedIn: false })),
      setHyasHydrated: (value) =>
        set((state) => ({ ...state, _hasHydrated: value })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem: deleteItemAsync,
      })),
      onRehydrateStorage: (state) => {
        return () => state.setHyasHydrated(true);
      },
    },
  ),
);
