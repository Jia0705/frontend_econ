import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + '/auth/login', { email, password });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + '/auth/signup', { name, email, password });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
