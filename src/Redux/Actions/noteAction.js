import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, ERROR_CONSTANT } from '../Constants/constants';


export const addNotes = (dateval, title, description) => async (dispatch, getState) => {

    dateval = dateval.toUpperCase();

    try {
        dispatch({
            type: ADD_NOTE,
            payload: { dateval, title, description }
        })


        localStorage.setItem('notes', JSON.stringify(getState().data))
        localStorage.setItem('id', JSON.stringify(getState().id))
    }

    catch (err) {

        console.log(err)
    }
}


export const updateNotes = (idVal, newDate, oldDate, titleVal, descriptionVal, flag) => async (dispatch, getState) => {

    newDate = newDate.toUpperCase();
    oldDate = oldDate.toUpperCase();
    try {

        dispatch({
            type: UPDATE_NOTE,
            payload: { idVal, newDate, oldDate, titleVal, descriptionVal, flag }
        })

        localStorage.setItem('notes', JSON.stringify(getState().data))
    }

    catch (err) {
        console.log(err)
    }
}


export const deleteNotes = (idValues, newDateVal) => async (dispatch, getState) => {

    newDateVal = newDateVal.toUpperCase();
    try {
        dispatch({
            type: DELETE_NOTE,
            payload: { idValues, newDateVal }
        })

        localStorage.setItem('notes', JSON.stringify(getState().data))
    }

    catch (err) {
        console.log(err)
    }
}

export const handleError = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ERROR_CONSTANT
        })

        localStorage.setItem('notes', JSON.stringify(getState().data))
    }

    catch (err) {
        console.log(err)
    }
}