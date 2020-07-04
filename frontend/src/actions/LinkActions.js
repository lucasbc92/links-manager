import { apiGet, apiPost, apiPut } from '../helpers/api';

export const LINK_CREATE = 'LINK_CREATE';
export const LINK_UPDATE = 'LINK_UPDATE';
export const LINK_GET = 'LINK_GET';
export const LINK_LIST = 'LINK_LIST';
export const LINK_DELETE = 'LINK_DELETE';

export const linkCreate = (data) => {
    const isSocial = data.isSocial ? true : false;

    const payload = apiPost('/link', { ...data, isSocial });

    return {
        type: LINK_CREATE,
        payload
    }
}

export const linkUpdate= (id, data) => {
    const isSocial = data.isSocial ? true : false;

    const payload = apiPut(`/link/${id}`, { ...data, isSocial });

    return {
        type: LINK_UPDATE,
        payload
    }
}

export const linkGet= (id) => {
    const payload = apiGet(`/link/${id}`);

    return {
        type: LINK_GET,
        payload
    }
}

export const linkList = (data) => {
    const payload = apiGet('/link');

    return {
        type: LINK_LIST,
        payload
    }
}

export const setLinkToDelete = (link) => {
    //console.log('*** LinkActions.setLinkToDelete.link', link);
    return {
        type: LINK_DELETE,
        payload: link
    }
}