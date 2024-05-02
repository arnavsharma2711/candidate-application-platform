import listingHelper from '../api/listingHelper';
import {
  SET_JOB_LIST,
} from './actions';

export const initialState = {
  jobList: [],
  limit: 10,
  offset: 0,
};
export function fetchJobList() {
  return async (dispatch, getState) => {
    const { limit, offset } = getState().listStore;
    try {
      const json = await listingHelper.getJobList(limit, offset);
        dispatch({ type: SET_JOB_LIST, payload: json.data });
    } catch (error) {
      console.error(error);
    }
  };
}

// ==============================|| LIST REDUCER ||============================== //

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOB_LIST:
      return {
        ...state,
        jobList: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;
