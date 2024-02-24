import axios from "axios";

export const spoonacular = axios.create({
  baseURL: "https://api.spoonacular.com",
  headers: {
    "X-API-KEY": import.meta.env.VITE_API_KEY,
  },
});
