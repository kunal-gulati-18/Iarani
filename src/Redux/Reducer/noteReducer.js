import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, ERROR_CONSTANT } from '../Constants/constants';


const notesData = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : {};
var id = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : 0;
const initialState = {
    data: notesData,
    id: id,
    error: ''
}

export const NoteReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_NOTE:

            var flag = 0;
            var obj = {}
            var { dateval, title, description } = action.payload;
            if (Object.keys(state.data).length !== 0) {
                for (var key in state.data) {
                    if (key == dateval) {
                        flag = 1;
                        break;
                    }
                }

                if (flag === 1) {

                    let copy_object = { ...state.data }
                    let id = state.id;
                    copy_object[key].push({ id, title, description })
                    return {
                        data: copy_object,
                        id: id + 1
                    }
                }

                else if (flag === 0) {

                    let copy_object = { ...state.data }
                    let id = state.id;
                    copy_object[dateval] = [{ id, title, description }]
                    return {
                        data: copy_object,
                        id: id + 1
                    }

                }
            }

            else {
                let id = state.id;
                obj[dateval] = [{ id, title, description }]

                return {
                    data: obj,
                    id: id + 1
                }


            }
        // //obj={
        //'nov 2020':[{'ok','fine'}]
        // }

        case UPDATE_NOTE:
            var { idVal, newDate, oldDate, titleVal, descriptionVal, flag } = action.payload
            if (flag === 'yes')  //old and new date equal
            {

                let objCopy = JSON.parse(JSON.stringify(state.data)) //creating deep copy

                Object.entries(objCopy).find(item => {
                    if (item[0] == newDate) {
                        item[1].find(items => {
                            if (items.id == idVal) {
                                items.title = titleVal ? titleVal : items.title;
                                items.description = descriptionVal ? descriptionVal : items.description;

                            }
                        })

                        objCopy[item[0]] = item[1]
                    }


                })



                return {
                    data: objCopy,
                    id: state.id
                }
            }
            else { //old and new date are not equal
                let objCopy = JSON.parse(JSON.stringify(state.data))
                //deleting the item from old date
                let updatedData = "";
                Object.entries(objCopy).find(item => {
                    if (item[0] == oldDate) {

                        updatedData = item[1].filter(items => items.id !== idVal)
                        objCopy[item[0]] = updatedData;
                        if (objCopy[item[0]].length == 0) {
                            delete (objCopy[item[0]]);
                        }

                    }


                })

                if (objCopy[newDate]) {
                    let id = idVal;
                    let title = titleVal;
                    let description = descriptionVal;
                    objCopy[newDate].push({ id, title, description })
                }
                else {
                    let id = idVal;
                    let title = titleVal;
                    let description = descriptionVal;
                    objCopy[newDate] = [{ id, title, description }]
                }


                return {
                    data: objCopy,
                    id: state.id
                }
            }



        case DELETE_NOTE:

            let { idValues, newDateVal } = action.payload;
            var updateObj = JSON.parse(JSON.stringify(state.data))
            let updatedData = [];
            let flagval = 0;
            Object.entries(updateObj).find(item => {
                if (item[0] == newDateVal) {

                    updatedData = item[1].filter(items => items.id !== idValues)
                    updateObj[item[0]] = updatedData;
                    if (updateObj[item[0]].length == 0) {
                        delete (updateObj[item[0]]);
                    }

                    flagval = 1;


                }



            })

            if (flagval == 1)  //means that this key value pair has been found
            {
                return {
                    data: updateObj,
                    id: state.id,
                    error: ''
                }
            }

            else if (flagval == 0) {
                return {
                    data: updateObj,
                    id: state.id,
                    error: 'Note corresponding to this date does not exists!!'
                }
            }

        case ERROR_CONSTANT: return {
            data: state.data,
            id: state.id,
            error: ''
        }


        default: return state;

    }

}