import { profile } from "@/lib/auth";
import { removeAuthTokens, setAuthTokens } from "@/lib/token";
import type { IUser } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ILoginState {
  access: string;
  refresh: string;
  user: IUser;
}

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (loginState: ILoginState) => void;
  logout: () => void;
  init: () => Promise<void>;
  isLoading: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {
        id: 360,
        email: "player360@gmail.com",
        firstName: "Player",
        lastName: "360",
        username: "player360",
        avatar: "test.png",
      },
      isLoading: true,
      isAuthenticated: false,
      login: ({ user, access, refresh }) => {
        setAuthTokens(access, refresh);
        set({
          user,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, isLoading: false });
        removeAuthTokens();
      },
      init: async () => {
        set({ isLoading: true });
        try {
          const r = await profile();
          set({
            user: { ...r },
            isAuthenticated: true,
          });
        } catch {
          get().logout();
        }
        set({ isLoading: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
