import listingHelper from '../api/listingHelper';
import { COMPANY_NAMES_IMAGES } from '../static/dummyCompanyData';
import {
  SET_JOB_LIST,
  SET_JOB_TOTAL_COUNT,
  SET_JOB_OFFSET,
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
      const updatedJobList = json.jdList.map(job => {
        const randomCompany = COMPANY_NAMES_IMAGES[Math.floor(Math.random() * COMPANY_NAMES_IMAGES.length)];
        return { ...job, jobCompany: randomCompany.name, companyImage: randomCompany.image };
      });
      dispatch({ type: SET_JOB_LIST, payload: updatedJobList });
      dispatch({ type: SET_JOB_TOTAL_COUNT, payload: json.totalCount });
      dispatch({ type: SET_JOB_OFFSET, payload: offset + limit });
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
    case SET_JOB_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;
