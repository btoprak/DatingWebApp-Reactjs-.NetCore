import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import *as datingActions from '../../redux/actions/datingActions';
class Home extends Component {

    render() {
        return (
            <div>
                Home Page
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
    };
};


const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getUsers: bindActionCreators(datingActions.getUsers, dispatch),
        }

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);