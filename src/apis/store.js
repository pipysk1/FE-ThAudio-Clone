import axios from '../axios';

export const getStore = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await axios.get('/audiobooks', {
      params: { page, limit, search },
    });
    return response;
  } catch (error) {
    console.warn(error);
  }
};
