import axiosInstance from "./axiosInstance";

export const authenticator = async () => {
  try {
    const response = await axiosInstance.get("/imagekit/auth");

    if (response.status !== 200) {
      throw new Error(`Authentication request failed: ${response.statusText}`);
    }

    const data = response.data;
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};