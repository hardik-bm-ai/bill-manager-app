export const setBill = Bills => dispatch => {
  dispatch({
    type: 'SET_BILLS',
    payload: Bills,
  });
};

export const setLoading = () => dispatch => {
  dispatch({
    type: 'SET_LOADING',
  });
};

export const doneLoading = () => dispatch => {
  dispatch({
    type: 'DONE_LOADING',
  });
};

export const addBill = bill => dispatch => {
  dispatch({
    type: 'ADD_BILL',
    payload: bill,
  });
};

export const deleteBills = bills => dispatch => {
  dispatch({
    type: 'DELETE_BILLS',
    payload: bills,
  });
};

export const selectBill = key => dispatch => {
  dispatch({
    type: 'SELECT_BILL',
    payload: key,
  });
};

// Clear selected bills list
export const clearSelection = () => dispatch => {
  dispatch({
    type: 'CLEAR_SELECTED',
  });
};

export const editBill = bill => dispatch => {
  dispatch({
    type: 'EDIT_BILL',
    payload: bill,
  });
};

export const editDone = bills => dispatch => {
  dispatch({
    type: 'DONE_EDITING',
    payload: bills,
  });
};

export const changeBudget = budget => dispatch => {
  dispatch({
    type: 'BUDGET_CHANGED',
    payload: budget,
  });
};

export const clearBudget = () => dispatch => {
  dispatch({
    type: 'CLEAR_BUDGET',
  });
};

export const editPayablesList = list => dispatch => {
  dispatch({
    type: 'EDIT_PAYABLE',
    payload: list,
  });
};

export const selectCategory = category => dispatch => {
  dispatch({
    type: 'CATEGORY_SELECT',
    payload: category,
  });
};
