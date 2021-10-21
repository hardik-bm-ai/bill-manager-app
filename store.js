import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
// import {Bills} from './Data/Bills';

const initialState = {
  bills: [],
  monthly_budget: 0,
  selected: [],
  billBeingEdited: {},
  isEdit: false,
  payableBills: [],
  isLoading: false,
};

const middleWare = [thunk];

function BillReducer(state, action) {
  switch (action.type) {
    case 'SET_BILLS':
      return {
        ...state,
        bills: [...action.payload],
      };
    case 'ADD_BILL':
      return {
        ...state,
        bills: [{...action.payload}, ...state.bills],
      };

    case 'SELECT_BILL':
      return {
        ...state,
        selected: [...state.selected, action.payload],
      };

    case 'CLEAR_SELECTED':
      return {
        ...state,
        selected: [],
      };

    case 'EDIT_BILL':
      return {
        ...state,
        billBeingEdited: {...action.payload},
        isEdit: true,
      };

    case 'DONE_EDITING':
      return {
        ...state,
        isEdit: false,
        bills: [...action.payload],
      };

    case 'DELETE_BILLS':
      return {
        ...state,
        bills: [...action.payload],
      };

    case 'BUDGET_CHANGED':
      return {
        ...state,
        monthly_budget: action.payload,
      };

    case 'CLEAR_BUDGET':
      return {
        ...state,
        monthly_budget: 0,
        payableBills: [],
      };

    case 'CATEGORY_SELECT':
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case 'EDIT_PAYABLE':
      return {
        ...state,
        payableBills: [...action.payload],
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOADING_DONE':
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

const store = createStore(
  BillReducer,
  initialState,
  compose(
    applyMiddleware(...middleWare),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
      ? a => a
      : window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
