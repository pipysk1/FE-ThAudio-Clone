import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_SERVER, // Set your API base URL
  timeout: 10000, // Optional: Set a timeout to prevent long requests
  headers: {
    'Content-Type': 'application/json', // Default content type
    // Add additional headers if needed, for example:
    // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
  },
});

// Optionally, you can add interceptors for requests or responses
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the config before sending the request, e.g., add authorization token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can handle global response modifications here if needed
    return response;
  },
  (error) => {
    // Handle errors globally, e.g., show an error notification
    return Promise.reject(error);
  }
);

export default axiosInstance;
