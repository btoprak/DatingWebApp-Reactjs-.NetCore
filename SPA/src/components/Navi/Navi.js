import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Navi.css';
import jwt_decode from 'jwt-decode'


class Navi extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        if (localStorage.getItem("jwtToken")) {
            var decoded = jwt_decode(localStorage.getItem("jwtToken"));
            var roles = decoded.role
        }

        return (
            <div>
                <Navbar className="navbar" light expand="md">
                    <NavbarBrand href="/">Datingapp</NavbarBrand>
                    <NavbarToggler />
                    <Collapse navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink className="link" to="/">Home</NavLink>
                            </NavItem>
                            {this.props.isAuth ?
                                <NavItem>
                                    <NavLink activeStyle={{ color: "white" }} className="link" to="/users">User List</NavLink>
                                </NavItem> : ""}

                            {this.props.isAuth ?
                                <NavItem>
                                    <NavLink activeStyle={{ color: "white" }} className="link" to="/likes">Likes</NavLink>
                                </NavItem> : ""}

                            {this.props.isAuth ?
                                <NavItem>
                                    <NavLink activeStyle={{ color: "white" }} className="link" to="/messages">Messages</NavLink>
                                </NavItem> : ""}

                            {this.props.isAuth && roles.indexOf("Admin") > -1 ?
                                <NavItem>
                                    <NavLink activeStyle={{ color: "white" }} className="link" to="/adminUsers">Admin</NavLink>
                                </NavItem> : ""}
                        </Nav>
                        <Nav className="ml-auto navbar">
                            {this.props.isAuth ?
                                <NavItem>
                                    <NavLink activeStyle={{ color: "white" }} className="link" to={"/userprofile/" + this.props.user.id}>
                                        <img src={this.props.user.photoUrl || require('../../assets/image/default-profile.png')} style={{ height: 40, width: 40 }} alt={this.props.user.userName}></img>
                                        {this.props.user.knownAs}</NavLink>
                                </NavItem>
                                :
                                <NavItem>
                                    <NavLink activeStyle={{ color: "white" }} className="link" to="/login">Login</NavLink>
                                </NavItem>
                            }
                            {this.props.isAuth ?
                                <NavItem>
                                    <NavLink activeStyle={{ color: "white" }} className="link" to="/logout">Logout</NavLink>
                                </NavItem> :
                                <NavItem>
                                    <NavLink activeStyle={{ color: "white" }} className="link" to="/register">Register</NavLink>
                                </NavItem>}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navi;
