import axios from 'axios';

import { beginAjaxCall } from "./ajaxStatusActions";
const { API_URL } = process.env;

import actionTypes from './constants';
import { handleError } from '../utils/errorHandler';

const { SAVE_VRI_AJAX, GET_USER_VRI_AJAX, GET_VRIS_AJAX, SAVE_TEMP_VRI } = actionTypes;

export function getVri(){
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return axios.get(`${API_URL}/vri/fetch`)
            .then((res) => {
                dispatch(
                    {
                    type: GET_VRIS_AJAX,
                    payload: res.data,
                    error: false
                    }
                );
            })
            .catch(error => handleError(error, dispatch));
    };
}

export function saveVri(choice){
    return (dispatch) => {
        console.log('Gets here 1');
        dispatch(beginAjaxCall());
        return axios.post(`${API_URL}/user/vri/`, { choice })
            .then(() => {
                dispatch(
                    {
                    type: SAVE_VRI_AJAX,
                    payload: choice,
                    error: false
                    }
                );
            })
            .catch(error => {
                console.log('Gets here 1-2');
                handleError(error, dispatch)
            });
    };
}

export function getUserVri(){
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return axios.get(`${API_URL}/user/vri/`)
            .then((res) => {
                dispatch(
                    {
                    type: GET_USER_VRI_AJAX,
                    payload: res.data,
                    error: false
                    }
                );
            })
            .catch(error => handleError(error, dispatch));
    };
}

export function saveTempVri(choices, score){
    return {
        type: SAVE_TEMP_VRI,
        payload: {
            choices,
            score
        }
    };
}
