import axios from "axios";

const instance = axios.create({ baseURL: "https://randomuser.me/api" });

export const getMembers = async ({
  queryKey,
}: {
  queryKey: {
    gender: string;
    results: number;
  };
}) => {
  // throw new Error("error");
  const { results, gender } = queryKey;
  const res = await instance.get(`?results=${results}&gender=${gender}`);
  return res.data;
};
