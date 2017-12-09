import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Topbar from './Topbar';
import StudentList from './StudentList';
import CampusList from './CampusList';
import Campus from './Campus';
import AddCampus from './AddCampus';
import Welcome from './Welcome';

import store, {fetchCampuses, fetchStudents} from '../store';


export default class Main extends Component {
    componentDidMount () {
        store.dispatch(fetchCampuses());
        store.dispatch(fetchStudents());
    }
    render () {
        return (
            <div>
                <Topbar />
                <main>
                    <Switch>
                        <Route exact path="/" component = {Welcome} />

                        <Route exact path="/campuses" component = {CampusList} />
                        <Route exact path="/campuses/add" component = {AddCampus} />
                        <Route exact path="/campuses/edit/:campusId" component = {AddCampus} />
                        <Route path="/campuses/:id" component = {Campus} />
                        <Route exact path="/students" component = {StudentList} />                
                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        );
    }
}