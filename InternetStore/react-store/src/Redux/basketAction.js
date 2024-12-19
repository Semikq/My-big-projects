import { actionCartAdd, actionCartDel, actionCartSet, actionCartClear } from './reducers/basketReducer';

export const addToCart = (dispatch, good, count, goodInfo) => {
  const cleanGoodInfo = { ...goodInfo };
  delete cleanGoodInfo.created_at;
  dispatch(actionCartAdd({ good: { _id: good }, count, goodInfo: cleanGoodInfo }));
};

export const removeFromCart = (dispatch, id) => {
  dispatch(actionCartDel({ id }));
};

export const setItemCount = (dispatch, productId, count) => {
  dispatch(actionCartSet({ good: { _id: productId }, count }));
};

export const clearCart = (dispatch) => {
  dispatch(actionCartClear());
};