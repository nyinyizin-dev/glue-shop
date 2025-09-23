import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  isLoggedIn: boolean; // for login
  _hasHydrated: boolean; // for splash screen
};

type Actions = {
  login: () => void;
  logout: () => void;
  setHyasHydrated: (value: boolean) => void;
};

const initialState: State = {
  isLoggedIn: false,
  _hasHydrated: false,
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      login: () => set((state) => ({ ...state, isLoggedIn: true })),
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
