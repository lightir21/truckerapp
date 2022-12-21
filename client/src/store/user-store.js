import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

// axios
const authFetch = axios.create({
  baseURL: "/api/v1",
});

export const useUserStore = create(
  persist(
    (set, get) => ({
      userData: {},
      signIn: async (values) => {
        const { userName, password } = values;

        if (!password || !userName) return;

        const { data } = await authFetch.post("/auth/login", {
          userName,
          password,
        });

        data && set({ userData: data });
      },

      signUp: async (values) => {
        const { userName, password, repeatPassword, adminPassword } = values;

        if (!userName || !password || !repeatPassword || !adminPassword) return;

        if (password !== repeatPassword) return;

        const { data } = await authFetch.post("/auth/register", {
          userName,
          password,
          adminPassword,
        });

        data && set({ userData: data });
      },
      updateUser: () => {},
      logoutUser: () => {
        set(() => ({ userData: {} }));
      },
    }),
    { name: "userData" }
  )
);
