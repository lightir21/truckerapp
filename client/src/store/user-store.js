import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useUserStore = create(
  persist(
    (set, get) => ({
      userData: {},
      signIn: () => {},
      signUp: async (values) => {
        const { userName, password, repeatPassword, adminPassword } = values;

        if (password !== repeatPassword) return;
        const { data } = await axios.post("/api/v1/auth/register", {
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
