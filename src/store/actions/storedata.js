import actionTypes from './actionTypes';
import * as apis from '../../apis';

export const getDataStore =
  (page = 1, limit = 10, search = '') =>
  async (dispatch) => {
    try {
      const response = await apis.getStore(page, limit, search);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_DATA_STORE,
          storeData: response.data.data,
          pagination: response.data.pagination,
        });
      } else {
        dispatch({
          type: actionTypes.GET_DATA_STORE,
          storeData: [],
          pagination: {},
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
