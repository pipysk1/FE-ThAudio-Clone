import actionTypes from './actionTypes';

export const isOpenSideBar = (dispath) => {
  return dispath({
    type: actionTypes.OPEN_SIDE_BAR,
    isOpen: true,
  });
};
export const isCloseSideBar = (dispath) => {
  return dispath({
    type: actionTypes.CLOSE_SIDE_BAR,
    isOpen: false,
  });
};
