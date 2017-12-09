import axios from 'axios';
import errorHandler, {ERROR} from './errorHandler';
//todo implement sockets

//action types
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';

//action creators
export function getCampuses (campuses){
    return {type: GET_CAMPUSES, campuses};
}

function getCampus (campus) {
    return {type: GET_CAMPUS, campus};
}

//thunks
export function fetchCampuses () {
   return dispatch => 
          axios.get('/api/campuses')
         .then (res => res.data)
         .then(campuses => {
             //const action = getCampuses(campuses);
             dispatch (getCampuses(campuses));
         })
         .catch(errorHandler);
}
  
export function deleteCampus (campusId, history) {
    return dispatch =>
            axios.delete(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(campus => {
                dispatch(fetchCampuses());
                if (history) 
                    history.push ('/campuses');      
            })
            .catch (errorHandler);
}

// export function editCampus (campus, history) {
//     return dispatch => {
//         axios.get(`/api/campuses/${campusId}`, )
//         .then(res => res.data)
//         .then(campus => {
//             dispatch(fetchCampuses());
//             history.push(`/campuses/edit/${campusId}`);
//         })
//     }
// }

// export function retrieveCampus (campusId) {
//     return dispatch => {
//         axios.get(`/api/campuses/${campusId}`)
//         .then(res => res.data)
//         .then(campus => dispatch(getCampus(campus)))
//         .catch(errorHandler);
//     }
// }

export function postCampus (name, imageUrl, description, history) {
    return dispatch => {
        axios.post(`/api/campuses`, {name, imageUrl, description})
        .then (res => res.data)
        .then (newCampus => {
           // console.log("POSTED CAMPUS");
            if (newCampus.id) {
               // console.log('got new campus', newCampus);
                dispatch(getCampus(newCampus));
            //socket.emit('new-campus', newCampus)
                history.push(`/campuses/${newCampus.id}`);
            } else {
                errorHandler(newCampus);
                history.push('/campuses/add')
            }
        }).catch(errorHandler);
    }
}

export function putCampus (name, imageUrl, description, campusId, history) {
    return dispatch => {
        //console.log("CAMPUS -------------", campusId);
        axios.put(`/api/campuses`, {name, imageUrl, description, campusId})
        .then (res => res.data)
        .then (newCampus => {
            //console.log("POSTED CAMPUS");
            if (newCampus) {
              //  console.log('got new campus', newCampus);
                dispatch(fetchCampuses());
            //socket.emit('new-campus', newCampus)
                history.push(`/campuses/${campusId}`);
            } else {
                errorHandler(newCampus);
                history.push('/campuses/add')
            }
        }).catch(errorHandler);
    }
}


//reducer
export default function campusReducer (state = [], action) {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;
        case GET_CAMPUS:
        //console.log('in campusReducer: ', action.campus);
            return [...state, action.campus];
        default: return state;
    }
}