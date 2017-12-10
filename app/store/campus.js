import errorHandler from './errorHandler';
import axios from 'axios';


//action types
const CHANGE_CAMPUS_NAME = 'CHANGE_CAMPUS_NAME';
const CHANGE_CAMPUS_IMG_URL = 'CHANGE_CAMPUS_IMG_URL';
const CHANGE_CAMPUS_DESC = 'CHANGE_CAMPUS_DESC';
const GET_CURRENT_CAMPUS='GET_CURRENT_CAMPUS';
const RESET_CAMPUS = 'RESET_CAMPUS';

//action creators

export function changeCampusName (campusName) {
    return {type: CHANGE_CAMPUS_NAME, campusName};
}

export function changeCampusImgUrl (campusImgUrl) {
    return {type: CHANGE_CAMPUS_IMG_URL, campusImgUrl};
}

export function changeCampusDesc (campusDesc) {
    return {type: CHANGE_CAMPUS_DESC, campusDesc};
}

export function clearCampus () {
    return {type: RESET_CAMPUS}
}

function getCampus (campus) {
    return {type: GET_CURRENT_CAMPUS, campus};
}

export function resetCampus (history, campusId) {
    return (dispatch) => {
        dispatch (clearCampus());
        if (history) {
            if (campusId) {
                history.push(`/campuses/${campusId}`)
            } else {
                history.push(`/campuses`);
            }
        }
        
    };
}

export function retrieveCampus (campusId) {
 //   console.log('+++++++++++++++++++++++++++++++++++++++++++', 'CALLED RETREIVE CAMPUS');
    return dispatch => {
        axios.get(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(campus => dispatch(getCampus(campus)))
        .catch(errorHandler);
    }
}

export function editCampus (campus, history) {
    return dispatch => {
       // console.log('+++++++++++++++++++++++++++++++++++++++++++', campus);
        dispatch(getCampus(campus));
        history.push(`/campuses/edit/${campus.id}`);
    }
}

//reducer
const initialState = {
    name: '',
    imageUrl: '',
    description: '',
    id: 0
}

export default function campusReducer (state = initialState, action) {
    switch (action.type) {
        case CHANGE_CAMPUS_NAME:
            return { ...state, name: action.campusName} ;
        case CHANGE_CAMPUS_IMG_URL:
            return { ...state, imageUrl: action.campusImgUrl};
        case CHANGE_CAMPUS_DESC:
            return { ...state, description: action.campusDesc};
        case GET_CURRENT_CAMPUS:
            return action.campus;
        case RESET_CAMPUS: {
            return initialState;
        }
        default: return state;
    }
}