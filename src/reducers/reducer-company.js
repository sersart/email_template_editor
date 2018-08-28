import { companyConstants } from '../constants';

export default function (state = null, action) {
    switch (action.type) {
        case companyConstants.GET_COMPANY_SUCCESS:
            return action.company;
        default:
            return state
    }
}