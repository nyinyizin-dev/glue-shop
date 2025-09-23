import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  isLoggedIn: boolean; // for login
  isOtpScreen: boolean;
  isPasswordScreen: boolean;
  _hasHydrated: boolean; // for splash screen
};

type Actions = {
  login: () => void;
  setOtpScreen: () => void;
  setPasswordScreen: () => void;
  logout: () => void;
  setHyasHydrated: (value: boolean) => void;
};

const initialState: State = {
  isLoggedIn: false,
  isOtpScreen: false,
  isPasswordScreen: false,
  _hasHydrated: false,
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      login: () =>
        set((state) => ({
          ...state,
          isLoggedIn: true,
          isOtpScreen: false,
          isPasswordScreen: false,
        })),
      setOtpScreen: () => set((state) => ({ ...state, isOtpScreen: true })),
      setPasswordScreen: () =>
        set((state) => ({ ...state, isPasswordScreen: true })),
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
