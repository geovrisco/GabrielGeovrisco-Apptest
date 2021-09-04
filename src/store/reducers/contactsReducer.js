import {type} from '../actions';

const initialState = {
  data: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.setContact:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default contactReducer;
