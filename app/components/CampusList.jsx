import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { deleteCampus, editCampus, fetchCampuses, resetCampus } from '../store';

class CampusList extends Component {
    componentDidMount() {
        this.props.loadCampuses();
        this.props.resetCampus(this.props.history);
    } 
    
    render () {
        if(this.props.campuses.length) {
       // console.log("IN CAMPUS RENDER_------------------", this.props.campuses)
            return (
                <div className='listContainer'>
                {this.props.campuses.map(campus => this.showCampusDiv(campus))}
                {this.displayAddCampusDiv ()}
                </div>
            );
        }
        else {
            return (
                <div className='listContainer'>
                {this.displayAddCampusDiv ()}
                </div>
            );
        }
    }

    showCampusDiv (campus)  {
      //  console.log("IN CAMPUS SHOW DIV _------------------", campus)
        return (
        <div  className='listItem' key={campus.id} >
                <div className='listItem-header'>
                    <button id={campus.id} className='listItem-delete' onClick={this.props.deleteCampus}>
                        <img id={campus.id} className='listItem-delete' src='/img/del.png' />
                    </button> 
                    
                    <span className='listItem-name'>
                        {`${campus.name}`}
                    </span>

                    <button className='listItem-edit'  id={campus.id}  onClick={this.props.editCampus}>
                        <img className='listItem-delete' id={campus.id} src='/img/edit.ico' />
                    </button>
            </div>
                <NavLink className='listItem-image' to={`/campuses/${campus.id}`}>  
                    <img  className='listItem-image' src={`${campus.imageUrl}`} />
                </NavLink>
            </div>
    
        );
    }
     displayAddCampusDiv ()  {
        return (
        <div  className='listItem' >
            <div className='listItem-header'>
                <span className='listItem-name-add listItem-name'>Add Campus</span>
            </div>
            <NavLink className='listItem-image' to={`/campuses/add`}>  
                    <img  className='listItem-image' src='/img/plus.png' />
            </NavLink>
        </div>
        );
    }
}
const mapStateToProps = (state) => ({ campuses: state.campuses });
const mapDispatchToProps = function (dispatch, props) {
    return {
        deleteCampus: (event) => {
            //console.log(event.target);
            dispatch(deleteCampus(event.target.id));  //put id on the image !
          },
        editCampus: (campus) => {
            dispatch(editCampus(campus, props.history));
        },
        loadCampuses: () => {
            dispatch(fetchCampuses());
        },
        resetCampus: () => dispatch(resetCampus(props.history))

    }
}

const mergeProps = (state, actions) => {
    return {
        ...state,
        ...actions,
        editCampus: (event) => {
            event.preventDefault();
            const editId = event.target.id;
            const campus = state.campuses.find(campus => campus.id === +editId);
            actions.editCampus(campus);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(CampusList));