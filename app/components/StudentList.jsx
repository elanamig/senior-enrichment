import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { editStudent, putStudent, deleteStudent, fetchStudents, fetchCampuses, postStudent, resetStudent, changeName, changeEmail, changeGpa, changeCampus} from '../store/';

class StudentList extends Component {
    componentDidMount () {
        this.props.getAllStudents();
        this.props.getAllCampuses();
    }
   
    render () {
        if (this.props.students.length) {
            const editStudentId = this.props.student.editStudentId;

           //console.log ("++++++++++++++++++GOT CAMPUS ID: ", this.props.campusId);
            const students = this.props.campusId?this.props.students.filter (student=>student.campusId === +this.props.campusId) : this.props.students;
            return (
                <div className='tableModule'>
                    <form onSubmit={this.props.handleSubmit}>
                        <table className='table table-condensed'>
                            <thead>
                                <tr>
                                    <th></th><th>Name</th><th>Email</th><th>GPA</th><th>Campus</th>
                                </tr>
                            </thead>
                            <tbody>
                            {renderTBody(students, this.props.deleteStudent, this.props.editStudent, editStudentId, this.props.campusId )}
                            </tbody>
                            <tfoot>
                            {renderFooter(this.props)}
                                
                            
                            </tfoot>
                        </table> 
                    </form>      
                </div>

            );
        }
        else return null;
    }   
}


const renderFooter = (props /*, editStudentObj*/) => {
    let buttons;
 //   console.log('RENDERING FOOTER', editStudentObj)
    if (props.student.editStudentId) {
        buttons = (
            <td>
                <button className='student-delete-button' onClick={props.updateStudent}>
                        <img  className='student-delete-img' src='/img/check.png' />
                    </button>
                    <button className='student-delete-button' type='reset' onClick={props.resetStudents} >
                        <img  className='student-delete-img' src='/img/minus.png' />
                    </button>
            </td>
                );
    }
    else {
        buttons =(
            <td> <button className='student-delete-button'>
            <img  className='student-delete-img' src='/img/plus2.png' />
        </button>
    </td>);
    }

    //const update = editStudentObj && editStudentObj.editInProgress;
   // if (editStudentObj) console.log('isEditInPrograess? ',editStudentObj.editInProgress);

    // const name = update?editStudentObj.name:props.student.name;
    // const email= update?editStudentObj.email:props.student.email;
    // const gpa = update?editStudentObj.gpa:props.student.gpa;
    // const campus = update?editStudentObj.campus:props.student.campus;

    const name = props.student.name || '';
    const email= props.student.email || '';
    const gpa = props.student.gpa || '';
    const campus = props.student.campus;
    //console.log('(((((((((((((((((((((((((((((((',props.campusId)
    return (
        <tr>
            {buttons}
            <td><input type='text' name='fullName' onChange={props.updateName} value={name} /></td>
            <td><input type='text' name='email' onChange={props.changeEmail} value={email} /></td>
            <td><input type='text' name='gpa' onChange={props.changeGpa} value={gpa} /></td>
            <td><select name='campus' onChange={props.changeCampus} value={campus?campus.id:1}> 
                {renderCampusSelect (props.campuses, campus, props.campusId)}  
                </select>
            </td>
        </tr>
    );
}
const renderCampusSelect = (campuses, campusId, limitCampusId) => {
   // console.log('rendering campuses', campuses);
    if (limitCampusId) {
        return (<option value={limitCampusId} >{campuses.find(campus=>campus.id===+limitCampusId).name}</option>)
    } else {
        const opts = campuses.map(campus => (<option key={`opt-${campus.id}`} value ={campus.id} >{campus.name}</option>));
        return  [<option key={`opt-0`} value ="0" >{"N/A"}</option>, ...opts]; 
               
    }
}
const renderTBody = (students, deleteStudent, editStudent, editStudentId, limitCampusId) => students.map(student => renderTRow(student, deleteStudent, editStudent, editStudentId, limitCampusId));
const renderTRow = (student, deleteStudent, editStudent, editStudentId, limitCampusId) => {
   //console.log('=================editStudentId', editStudentId, 'student', student);
    if (+editStudentId !== +student.id) {
        const link = limitCampusId?student.campus.name:student.campus?<NavLink to={`/campuses/${student.campus.id}`}>{student.campus.name}</NavLink>:"";
        return (
            <tr key={`stu-${student.id}`}>
                <td className='student-delete-col'>
                    <button id={`del-${student.id}`} type='reset' className='student-delete-button' onClick={deleteStudent}>
                        <img id={student.id} className='student-delete-img' src='/img/del.png' />
                    </button>
                    <button id={`edit-${student.id}`} type='reset' className='student-delete-button' onClick={editStudent}>
                    <img id={student.id} className='student-delete-img' src='/img/edit.ico' />
                </button>
                </td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.gpa}</td>
                <td>{link}</td>
            </tr>
        );
    } else return null;
}

const mapStateToProps = (state, props) => {
 //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', props)
    return { 
        students: state.students, 
        campuses: state.campuses,
        student: state.student,
        campusId: props.campusId   
    }
};

// const mapStateToProps = (state, props) => ({ 
//         students: state.students, 
//         campuses: state.campuses,
//         student: state.student   
//     });

const mapDispatchToProps = function (dispatch, props) {
    return {
        editStudent: (student) => {
            //event.preventDefault();
            dispatch(editStudent(student));
            //console.log('editStudent', event.target);
        },
        deleteStudent: (event) => {
      //      console.log(event.target);
    //        console.log(event.target.id);
            dispatch(deleteStudent(event.target.id, props.campusId));
        },  //put id on the image !
        handleSubmit: (event) => {
            event.preventDefault(); 
           // console.log(event.target.fullName.value.split(' ')); 
            const [firstName = "", lastName=""] = event.target.fullName.value.split(' ');
            const email = event.target.email.value;
            const gpa = event.target.gpa.value;
            const campus = event.target.campus.value;
         //   console.log(firstName, lastName, email, gpa, campus.id);
            dispatch (postStudent (firstName.trim(), lastName.trim(), email, gpa, campus, props.history, props.campusId));
            dispatch (resetStudent ());
        },
        getAllStudents: () => dispatch(fetchStudents()),
        getAllCampuses: () => dispatch (fetchCampuses()),
        updateName: (event) => {
            event.preventDefault();
            dispatch (changeName(event.target.value))
        },
        changeEmail: (event) => {
            event.preventDefault();
            dispatch (changeEmail(event.target.value));
        },
        changeGpa: (event) => {
            event.preventDefault();
            dispatch (changeGpa(event.target.value))
        },
        changeCampus: (campus) => {
            //event.preventDefault();
            //console.log("CHANGE CAMPUS TRIGGERED: ", event.target.value)
            dispatch (changeCampus(campus))
        },
        resetStudents: (event) => {
            event.preventDefault();
            dispatch (resetStudent())
        },
        updateStudent: (student) => {
            event.preventDefault();
            const [firstName = "", lastName=""] = student.name.split(' ');
            const email = student.email;
            const gpa = student.gpa;
            const campusId = student.campus?student.campus.id:null;
            const studentId = student.id;
            // const [firstName = "", lastName=""] = event.target.fullName.value.split(' ');
            // const email = event.target.email.value;
            // const gpa = event.target.gpa.value;
            // const campus = event.target.campus.value;
           // console.log('%%%%%%%%%%%%%%%%',firstName, lastName, email, gpa, campus);
            dispatch (putStudent (firstName.trim(), lastName.trim(), email, gpa, campusId, studentId, props.history, props.campusId));
            dispatch (resetStudent ());
        }
    }
}


const mergeProps = (state, actions) => {
    return {
        ...state,
        ...actions,
        editStudent: (event) => {
            event.preventDefault();
            const editId = event.target.id;
            const student = state.students.find(student => student.id === +editId);
            actions.editStudent(student);
        },
        updateStudent (event) {
            event.preventDefault();
            actions.updateStudent(state.student);
        },
        changeCampus (event) {
            event.preventDefault();
            actions.changeCampus(state.campuses.find(campus=>campus.id===+event.target.value));
        }
        
    }

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(StudentList));