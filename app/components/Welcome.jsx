import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

export default function Welcome (props) {
    return (
        <div className="welcome-container"> <h4>Don't let the bounds of the Universe limit your dreams.  </h4> <hr /> <p>Margaret Hamiltion Interplanetary Academy of JavaScript will take your skills beyond this galaxy.  We operate on multiple campuses within Milky Way and offer a remote program for our out-of-this-world students.  We follow a No Student Left Behind policy and utilize advanced teaching methodologies developed over millenia of research and analysis.   </p><p>Explore our state-of-the-art campuses, multi-species student body, diverse curriculum and a packed calendar of events.  Let the links above launch your career at warp speed. </p></div>
    );
}