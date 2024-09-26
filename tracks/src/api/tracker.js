import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'https://3131-194-193-129-47.ngrok-free.app', // Ensure this URL is correct
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // Retrieve the token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
