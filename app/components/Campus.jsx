import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { retrieveCampus, editCampus, deleteCampus } from '../store';
import StudentList from './StudentList';

class Campus extends Component {
    componentDidMount () {
    //if loading this page directly, fetch the campus!
   // console.log("LOADING CAMPUS", this.props.match);
        this.props.loadCampus(this.props.match.params.id);
    }

    render () {
        //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!in Campus component',this.props.campus);
        if(this.props.campus.id) {
            
            return (
                <div className='mainCampus'>
                
                    <div className='mainCampus-header'>
                        <div className='mainCampus-imgdesc'>
                            <img src={`/${this.props.campus.imageUrl}`} />
                            <h4>  {this.props.campus.name}</h4>
                            <NavLink className='leftPadding' to={`/campuses/edit/${this.props.campus.id}`}>
                                <img className='listItem-delete' id={this.props.campus.id} src='/img/edit.ico' />
                            </NavLink>
                            <button id={this.props.campus.id} className=' mainCampus-del' onClick={this.props.deleteCampus}>
                            <img id={this.props.campus.id} className='mainCampus-del' src='/img/del.png' />
                        </button> 
                        </div>
                        <span>{this.props.campus.description}</span>  
                    </div>
                    
                        <StudentList campusId={this.props.campus.id} />
                    
            </div>
            );
        }
        return null;
    }
}

const mapStateToProps = (state, props) => {
    //console.log('state', state, 'props', props);
    // if (state.campuses.length) { //didn't navite directly, but through a main page
    //     return ({ campus: state.campuses.find(campus => campus.id === +props.match.params.id) });
    // }
    // else return { campus: null };
    return {
        campus: state.campus
    }
}
const mapDispatchToProps = function (dispatch, props) {
    return {
        loadCampus: (campusId) => {
           // console.log('loading campus')
            dispatch(retrieveCampus(campusId));  
          },
          deleteCampus: (event) => {
            //console.log(event.target);
            dispatch(deleteCampus(event.target.id, props.history));  //put id on the image !
          }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Campus));