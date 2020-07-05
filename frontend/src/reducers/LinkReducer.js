import { 
    LINK_LIST, 
    LINK_GET, 
    LINK_CREATE,
    LINK_UPDATE,
    LINK_TO_DELETE,
    LINK_DELETE
} from '../actions/LinkActions';

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
        case LINK_TO_DELETE: {
            return {...state, linkToDelete: payload};
        }
        case LINK_DELETE: {
            //console.log('*** LinkReducer.LINK_DELETE.payload', payload)

            const links = state.links.filter(link => 
                link.id !== state.linkToDelete.id
            );

            return {...state, linkToDelete: null, links};
        }
        default: return {...state}
    }
}