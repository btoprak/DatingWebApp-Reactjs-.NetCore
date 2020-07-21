import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from "redux";
import *as authActions from './redux/actions/authActions';

import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navi from './components/Navi/Navi';
import Logout from './components/Auth/Logout';
import UserList from './components/User/UserList';
import UserDetail from './components/User/UserDetail/UserDetail';
import UserProfile from './components/User/UserProfile/UserProfile';
import UserLikes from './components/User/UserLikes/UserLikes';
import MessageList from './components/Message/MessageList';
import AdminUsers from './components/Admin/AdminUsers';
import jwt_decode from 'jwt-decode'

class App extends Component {

  componentDidMount() {
    this.props.actions.onTryAutoSignup();
  }

  render() {
    
    if (localStorage.getItem("jwtToken")) {
      var decoded = jwt_decode(localStorage.getItem("jwtToken"));
      var roles = decoded.role

    }
    return (
      <div>
        <Navi user={this.props.authUser} isAuth={this.props.isAuthenticated}></Navi>
        <Container>
          {
            this.props.isAuthenticated ?
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/users" component={UserList} />
                <Route path="/likes" component={UserLikes} />
                <Route path="/messages" component={MessageList} />
                {roles.indexOf("Admin") > -1 ? <Route path="/adminUsers" component={AdminUsers} /> : ""}
                <Route path="/user/:userId" component={UserDetail} />
                <Route path="/userprofile/:userId" component={UserProfile} />
                <Route path="/logout" component={Logout} />
              </Switch> :
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/register" component={Register} />
              </Switch>
          }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    authUser: state.authReducer.user
  };
};


const mapDispatchToProps = dispatch => {
  return {
    actions: {
      onTryAutoSignup: bindActionCreators(authActions.authCheckState, dispatch),
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);