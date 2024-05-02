import listingHelper from '../api/listingHelper';
import {
  SET_JOB_LIST,
  SET_JOB_TOTAL_COUNT,
} from './actions';

export const initialState = {
  jobList: [],
  totalCount: 0,
  limit: 10,
  offset: 0,
};
export function fetchJobList() {
  return async (dispatch, getState) => {
    const { limit, offset } = getState().listStore;
    try {
      const json = await listingHelper.getJobList(limit, offset);
      dispatch({ type: SET_JOB_LIST, payload: json.jdList });
      dispatch({ type: SET_JOB_TOTAL_COUNT, payload: json.totalCount });
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
        jobList: [...state.jobList, ...action.payload],
      };
    case SET_JOB_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;
