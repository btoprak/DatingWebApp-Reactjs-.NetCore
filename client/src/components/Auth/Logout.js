import React, { Component } from 'react'
import * as authActions from '../../redux/actions/authActions'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authActions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);