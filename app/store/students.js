import axios from 'axios';
import errorHandler, {ERROR} from './errorHandler';
//todo implement sockets

//action types
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';

//action creators
export function getStudents (students){
    return {type: GET_STUDENTS, students};
}

export function getStudent (student) {
    return {type: GET_STUDENT, student};
}

//thunks
export function fetchStudents () {
   return dispatch => 
          axios.get('/api/students')
         .then (res => res.data)
         .then(students => {
             dispatch (getStudents(students));
         })
         .catch(errorHandler);
}
  
export function deleteStudent (studentId) {
    return dispatch =>
            axios.delete(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(student => dispatch(fetchStudents()))
            .catch (errorHandler);
}

export function retrieveStudent (studentId) {
    return dispatch => {
        axios.get(`/api/campuses/${studentId}`)
        .then(res => res.data)
        .then(student => dispatch(getStudent(student)))
        .catch(errorHandler);
    }
}

export function postStudent (firstName, lastName, email, gpa, campusId, history, limitCampusId) {
    const link = limitCampusId?`/campuses/${limitCampusId}`:'/students/';
    return dispatch => {
        axios.post(`/api/students`, {firstName, lastName, campusId, email, gpa})
        .then (res => res.data)
        .then (newStudent => {
        //    console.log('got new student', newStudent);
            if (newStudent.id) {
                //console.log('got new student', newStudent);
                dispatch(fetchStudents());
            //socket.emit('new-campus', newCampus)
                //history.push(`/students/`);
                history.push(link);
            } else {
                errorHandler(newStudent);
                //history.push('/students/')
                history.push(link);
            }
        }).catch(errorHandler);
    }
}

export function putStudent (firstName, lastName, email, gpa, campusId, studentId, history, limitCampusId) {
    const link = limitCampusId?`/campuses/${limitCampusId}`:'/students/';
    return dispatch => {
        axios.put(`/api/students`, {firstName, lastName, campusId, email, gpa, studentId})
        .then (res => res.data)
        .then (newStudent => {
       //     console.log('got new student', newStudent);
            if (newStudent) {
                //console.log('got new student', newStudent);
                dispatch(fetchStudents());
            //socket.emit('new-campus', newCampus)
                //history.push(`/students/`);
                history.push(link)
            } else {
                errorHandler(newStudent);
                //history.push('/students/')
                history.push(link);
            }
        }).catch(errorHandler);
    }
}

//reducer
export default function studentsReducer (state = [], action) {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students;
        case GET_STUDENT:
            return [...state, action.student];
        default: return state;
    }
}