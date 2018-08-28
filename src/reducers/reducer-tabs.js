import { tabsConstants } from '../constants';

const tabs = (state = {}, action) => {
	switch (action.type) {
		case tabsConstants.SET_VISIBLE:
			let tabs = {
				blocks: false,
				common: false,
				options: false,
			};
			tabs[action.tab] = true;
			return Object.assign({}, state, tabs);
		default:
			return state;
	}
}

export default tabs;