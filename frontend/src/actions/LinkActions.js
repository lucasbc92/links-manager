import { apiGet, apiPost } from '../helpers/api';

export const LINK_CREATE = 'LINK_CREATE';
export const LINK_LIST = 'LINK_LIST'

export const linkCreate = (data) => {
    const isSocial = data.isSocial ? true : false;

    const payload = apiPost('/link', { ...data, isSocial });

    return {
        type: LINK_CREATE,
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