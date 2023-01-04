import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { addNewDriver } from "../service";
import { json } from "react-router-dom";

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
      missions: [],
      loading: true,

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
        set({ userData: {}, drivers: [], driver: {} });
      },

      addNewDriver: addNewDriver,

      getAllDrivers: async () => {
        const { data } = await authFetch.get("drivers");

        data && set({ drivers: data.drivers });
      },

      getDriver: async (userId) => {
        set({ loading: true });
        const { data } = await authFetch.get(`drivers/${userId}`);
        data && set({ driver: data });
        set({ loading: false });
      },

      uploadProfileImg: async (file) => {
        // const stringifiedFile = JSON.stringify(file);
        try {
          const { data } = await authFetch.patch("/auth/uploadImage", {
            data: file,
          });
          data && set({ userData: data });
        } catch (error) {
          console.log(error);
        }
      },

      addNewMission: async (values, driverId) => {
        try {
          await authFetch.post("job", {
            ...values,
            createdFor: driverId,
          });
        } catch (error) {
          console.log(error);
        }
      },

      getMissionByDate: async (date, driverId) => {
        try {
          const { data } = await authFetch.post("job/getJobs", {
            date,
            driverId,
          });
          data && set({ missions: data });
        } catch (error) {}
      },
    }),
    { name: "userData" }
  )
);
