import axios from "axios";

// axios
const authFetch = axios.create({
  baseURL: "/api/v1",
});

export const addNewDriver = async (values) => {
  const { name, lastName, password, repeatPassword, truckNum, image } = values;

  if (!name || !lastName || !password || !repeatPassword || !truckNum) return;
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
};
