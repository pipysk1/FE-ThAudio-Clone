import axios from '../axios';

export const getAudio = async (store_plug) => {
  console.log(store_plug);

  try {
    const response = await axios.get(`/archive/${store_plug}`);
    return response.data;
  } catch (error) {
    console.warn(error);
  }
};
