import ApiUtils from "../utils/ApiUtils";
import { JOB_LISTING_API } from "../utils/constants";

function getJobList(limit = 10, offset = 0) {
    return ApiUtils.request("POST", JOB_LISTING_API, { limit, offset })
}

const listingHelper = { getJobList };

export default listingHelper;
