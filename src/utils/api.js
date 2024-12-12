import axios from "axios";

const API_URL = "http://localhost:3000";

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL + "/products"); 
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories"); 
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
