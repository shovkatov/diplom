import axios from 'axios';

const _URL = 'http://f0607823.xsph.ru/elyor/public/api/event';

export const getInfo = () => (dispatch) => {
    axios({
        method: 'post',
        url: 'http://f0607823.xsph.ru/elyor/public/api/user/login',
        data: {
            login: 'elyor',
            password: 'Qwer1234',
        },
    }).then((response) => {
        const token = response.data.token;
        axios({
            method: 'get',
            url: _URL,
            headers: {Authorization: 'Bearer ' + token},
        }).then((response) => {
            dispatch({type: 'getInfo', payload: response.data});
        });
    });
};

export const searchElement = (e) => (dispatch) => {
    dispatch({type: 'search', payload: e})
}

export const favouriteElement = (e) => (dispatch) => {
    dispatch({type: 'favourite', payload: e})
}

export const delFavouriteElement = (e) => (dispatch) => {
    dispatch({type: 'favouriteDel', payload: e})
}

export const accountName = (e) => (dispatch) => {
    dispatch({type: 'accountName', payload: e})
}