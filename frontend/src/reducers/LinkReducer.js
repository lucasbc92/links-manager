import { LINK_LIST, LINK_GET, LINK_CREATE, LINK_UPDATE, LINK_DELETE } from '../actions/LinkActions';

const initialState = {
    link: null,
    links: [],
    linkToDelete: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case LINK_LIST: {
            const response = (payload) ? payload.data : null;
            const links = (response) ? response.data : null;
            
            return {...state, links};
        }
        case LINK_GET: {
            const response = (payload) ? payload.data : null;
            const link = (response) ? response.data : null;
            
            return {...state, link};
        }
        case LINK_CREATE: {
            const response = (payload) ? payload.data : null;
            const link = (response) ? response.data : null;
            
            return {...state, link};
        }
        case LINK_UPDATE: {
            const response = (payload) ? payload.data : null;
            const link = (response) ? response.data : null;
            
            return {...state, link};
        }
        case LINK_DELETE: {
            return {...state, linkToDelete: payload};
        }
        default: return {...state}
    }
}