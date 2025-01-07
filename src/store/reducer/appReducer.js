import actionTypes from '../actions/actionTypes';

const initState = {
  isOpen: false,
  storeData: [],
  pagination: {
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
  },
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_SIDE_BAR:
      return {
        ...state,
        isOpen: true,
      };
    case actionTypes.CLOSE_SIDE_BAR:
      return {
        ...state,
        isOpen: false,
      };
    case actionTypes.GET_DATA_STORE:
      return {
        ...state,
        storeData: action.storeData || [],
        pagination: {
          currentPage: action.pagination?.currentPage || 1,
          totalItems: action.pagination?.totalItems || 0,
          totalPages: action.pagination?.totalPages || 1,
        },
      };
    default:
      return state;
  }
};

export default appReducer;
