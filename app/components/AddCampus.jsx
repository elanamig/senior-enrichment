import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//import { NavLink } from 'react-router-dom';
import { postCampus, resetCampus,putCampus,retrieveCampus, changeCampusName, changeCampusImgUrl, changeCampusDesc } from '../store'

class AddCampus extends Component {
    componentDidMount () {
        //console.log("*****************++++++++0000000*****", this.props)
        if(this.props.match.params.campusId)
            this.props.getCampus (this.props.match.params.campusId)
    }
    render () {
    //console.log("**********************", this.props)
    const campus = this.props.campus;
    const campusName = campus?campus.name:'';
    const imageUrl = campus?campus.imageUrl:'';
    const desc = campus?campus.description: '';
    const id = campus?campus.id:'';
    return (
        <div className='addModule'> 
            <h3 className='addModule-inner'> Add/Modify Campus </h3>
            <form onSubmit={this.props.handleSubmit} >
              <div className='addModule-rightPadding'>
               <div className='addModule-inner'> <span className='addModule-label'>Name: </span><input className='addModule-input' 
                        size='30'
                        type='text' 
                        name='name' 
                        value={campusName}
                        onChange={this.props.handleChangeName} />
                </div>
                <div className='addModule-inner'> <span className='addModule-label'>Image Url: </span> <input  className='addModule-input' 
                    size='30'
                    type='text' 
                    name='imgUrl' 
                    value={imageUrl}
                    onChange={this.props.handleChangeImage} />
                </div>
                <div className='addModule-inner'> <span className='addModule-label'>Description: </span> <textarea  className='addModule-input' 
                    rows='7'
                    cols='30'
                    name='description' 
                    value={desc}
                    onChange={this.props.handleChangeDescription} />
                </div>
               </div>
                <div className='addModule-inner'> 
                    <button className='btn btn-success addModule-button' type='submit' value='submit'>Submit</button> 
                    <button onClick={this.props.handleReset} className='btn btn-warning addModule-button' type='reset' value='reset'>Reset</button> 
                    <button onClick={this.props.handleCancel} className='btn btn-danger addModule-button' type='cancel' value='cancel'>Cancel</button> 
                </div>
            </form>
        </div>
    );
}
}

const mapStateToProps = (state) => ({ 
    newCampus: state.newCampus, 
    campus: state.campus
});
const mapDispatchToProps = function (dispatch, props) {
    return {
        handleChangeName: (event) => {
            event.preventDefault();
            dispatch(changeCampusName(event.target.value))
        },
        handleChangeImage: (event) => {
            event.preventDefault();
            dispatch(changeCampusImgUrl(event.target.value));
        },
        handleChangeDescription: (event) => {
            event.preventDefault();
            dispatch(changeCampusDesc(event.target.value));
        },
        handleSubmit: (event) => {
            event.preventDefault();  
            //console.log("{{{{{{{{{{{{{{}}}}}}}}}}}}}", props.match.params.campusId);

            const campusName = event.target.name.value;
            const campusImgUrl = event.target.imgUrl.value;
            const campusDesc = event.target.description.value;
            if (props.match.params.campusId) {
                dispatch (putCampus (campusName, campusImgUrl, campusDesc, props.match.params.campusId, props.history));
            } else {
                dispatch (postCampus (campusName, campusImgUrl, campusDesc, props.history));
            }
            dispatch (resetCampus ());
        },
        handleReset: (event) => {
            event.preventDefault();
           // console.log('resetting in AddCampus');
            dispatch (resetCampus ());
            props.history.push('/campuses/add')
        },
        handleCancel: (event) => {
            event.preventDefault();
            dispatch (resetCampus());
            props.history.push('/campuses')
        },
        getCampus: (campusId) => {
            dispatch(retrieveCampus(campusId));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCampus));