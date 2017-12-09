import errorHandler from './errorHandler';


//action types
const CHANGE_NAME = 'CHANGE_NAME';
const CHANGE_EMAIL = 'CHANGE_EMAIL';
const CHANGE_GPA = 'CHANGE_GPA';
const CHANGE_CAMPUS = 'CHANGE_CAMPUS';
const RESET_STUDENT = 'RESET_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';
//action creators

export function changeName (name) {
    //console.log("CHANGE NAME", name);
    return {type: CHANGE_NAME, name};
}

export function changeEmail (email) {
    return {type: CHANGE_EMAIL, email};
}

export function changeGpa (gpa) {
    return {type: CHANGE_GPA, gpa};
}

export function changeCampus (campus) {
    return {type: CHANGE_CAMPUS, campus};
}

export function resetStudent () {
    //console.log("resetting the student!");
    return {type: RESET_STUDENT}
    // return (dispatch) => {
    //     dispatch (changeName(''));
    //     dispatch (changeEmail(''))
    //     dispatch (changeGpa(''));
    //     dispatch (changeCampus(''));
    // };
}

export function editStudent (student) {
   // console.log('editing stuent');
    return {type: EDIT_STUDENT, student}
}

const initialState = {
    name: '',
    email: '',
    gpa: '',
    campus: {},
    editStudentId: 0
}
//reducer
export default function studentReducer (state = initialState, action) {
    switch (action.type) {
        case CHANGE_CAMPUS:
            return {...state, campus:action.campus, editInProgress: false};
        case CHANGE_NAME:
            return {...state, name: action.name, editInProgress: false};
        case CHANGE_GPA:
            return {...state, gpa: action.gpa, editInProgress: false};
        case CHANGE_EMAIL:
            return {...state, email: action.email, editInProgress: false};
        case RESET_STUDENT: 
            return initialState;
        case EDIT_STUDENT:
            return {...state, ...action.student, editStudentId: action.student.id?action.student.id:0};
        default: return state;
    }
}