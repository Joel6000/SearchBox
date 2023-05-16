export const STORE_RESULT = 'STORE_RESULT';
export const REMOVE_RESULT = 'REMOVE_RESULT';
export const STORE_HISTORY = 'STORE_HISTORY';
export const REMOVE_HISTORY = 'REMOVE_HISTORY';
export const STORE_GEOMETRY = 'STORE_GEOMETRY'

export const storeResult = data => dispatch => {
    dispatch({
        type: STORE_RESULT,
        payload: data,
    });
};

export const removeResult = data => dispatch => {
    dispatch({
        type: STORE_RESULT,
        payload: data,
    });
};

export const storeHistory = data => dispatch => {
    dispatch({
        type: STORE_HISTORY,
        payload: data,
    });
};

export const removeHistory = data => dispatch => {
    dispatch({
        type: REMOVE_HISTORY,
        payload: data,
    });
};

export const storeGeometry = data => dispatch => {
    dispatch({
        type: STORE_GEOMETRY,
        payload: data,
    });
};