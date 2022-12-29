import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { addNewDriver } from "../service";

// axios
const authFetch = axios.create({
  baseURL: "/api/v1",
});

export const useUserStore = create(
  persist(
    (set, get) => ({
      userData: {},
      drivers: [],
      driver: {},

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
          role: "admin",
        });

        data.user.role = undefined;

        data && set({ userData: data });
      },
      updateUser: () => {},

      logoutUser: async () => {
        await authFetch.post("/auth/logout");
        set({ userData: {} });
      },

      addNewDriver: addNewDriver,

      getAllDrivers: async () => {
        const { data } = await authFetch.get("drivers");

        data && set({ drivers: data.drivers });
      },

      getDriver: async (userId) => {
        const { data } = await authFetch.get(`drivers/${userId}`);
        data && set({ driver: data });
      },
    }),
    { name: "userData" }
  )
);
