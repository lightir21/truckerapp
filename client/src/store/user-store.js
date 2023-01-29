import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// axios
const authFetch = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

export const useUserStore = create(
  persist(
    (set, get) => ({
      userData: {},
      drivers: [],
      driver: {},
      missions: [],
      editMission: {},
      loading: true,
      isEditing: false,
      textToCopy: "",

      setIsEditing: (bool) => set({ isEditing: bool }),

      setEditMission: ({ jobId }) => {
        set((state) => ({
          editMission: state.missions.filter(
            (mission) => mission._id === jobId
          )[0],
        }));
      },

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

      logoutUser: async () => {
        await authFetch.post("/auth/logout");
        set({ userData: {}, drivers: [], driver: {} });
      },

      addNewDriver: async (values) => {
        const { name, lastName, password, repeatPassword, truckNum, image } =
          values;

        if (!name || !lastName || !password || !repeatPassword || !truckNum)
          return;
        if (truckNum.length < 7) return;

        if (password !== repeatPassword) return;

        const userName = `${name} ${lastName}`;

        const { data } = await authFetch.post("/drivers", {
          name,
          lastName,
          password,
          truckNum,
          userName,
          image,
        });
      },

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

      deleteMission: async ({ jobId }) => {
        try {
          await authFetch.delete("job", { data: { jobId } });

          set((state) => ({
            missions: state.missions.filter((mission) => mission._id !== jobId),
          }));
        } catch (error) {
          console.log(error);
        }
      },

      updateMission: async ({ jobId }, values) => {
        try {
          const updatedMission = await authFetch.patch("job", {
            jobId,
            ...values,
          });

          set((state) => ({
            missions: state.missions.map((mission) => {
              if (mission._id === jobId) {
                return updatedMission;
              }
              return mission;
            }),
          }));
        } catch (error) {
          console.log(error);
        }
      },

      updateTruckNum: async (driverId, truckNum) => {
        try {
          const { data } = await authFetch.patch(`drivers/${driverId}`, {
            truckNum,
          });

          set({ driver: { user: data } });
        } catch (error) {
          console.log(error);
        }
      },

      updateAdminInfo: async (values) => {
        try {
          const { data } = await authFetch.patch("auth", values);
          set({ userData: data });
        } catch (error) {
          console.log(error);
        }
      },

      copyText: async (list) => {
        try {
          const text = list?.join("\r\n\r\n");
          return await navigator.clipboard.writeText(text);
        } catch (error) {
          console.log(error);
        }
      },

      checkAuth: async () => {
        try {
          const { status } = await authFetch.post("/auth/checkAuth");
          return status;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    { name: "userData" }
  )
);
