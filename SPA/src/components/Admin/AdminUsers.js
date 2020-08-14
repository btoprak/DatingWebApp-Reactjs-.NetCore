import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import *as adminActions from '../../redux/actions/adminActions';
import { Tabs, Tab } from 'react-bootstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            user: {},
            availableRoles: [
                { name: "Admin", value: "Admin", isChecked: false },
                { name: "Moderator", value: "Moderator", isChecked: false },
                { name: "Member", value: "Member", isChecked: false },
                { name: "VIP", value: "VIP", isChecked: false }
            ],
        }
    }

    async componentDidMount() {
        await this.props.actions.getUsersWithRoles();

        this.setState({ users: this.props.users })
    }

    toggle = (user) => {
        this.setState({ user: user })

        for (let i = 0; i < this.state.availableRoles.length; i++) {
            let isMatch = false;
            if (user.roles) {
                for (let j = 0; j < user.roles.length; j++) {
                    if (this.state.availableRoles[i].name === user.roles[j]) {
                        isMatch = true;
                        const { availableRoles } = this.state;
                        availableRoles[i].isChecked = true;
                        this.setState({ availableRoles });
                        // this.state.availableRoles[i].isChecked = true;
                        break;
                    }
                }
            }
            if (!isMatch) {
                const { availableRoles } = this.state;
                availableRoles[i].isChecked = false;
                this.setState({ availableRoles });
                // this.state.availableRoles[i].isChecked = false;
            }
        }
        let modal = this.state.modal
        this.setState({ modal: !modal });
    }

    handleCheckChieldElement = (event) => {
        let roles = this.state.availableRoles
        roles.forEach(role => {
            if (role.value === event.target.value)
                role.isChecked = event.target.checked
        })
        this.setState({ availableRoles: roles })
    }

    updateRoles = () => {
        const rolesToUpate = {
            roleNames: [...this.state.availableRoles.filter(el => el.isChecked === true).map(el => el.name)]
        }
        console.log(rolesToUpate)
        this.props.actions.updateRoles(this.state.user, rolesToUpate);
        let modal = this.state.modal
        this.setState({ modal: !modal });
    }

    render() {
        console.log(this.state.user)
        return (
            <div className="container mt-5">
                <h2>Admin Panel</h2>
                <div className="tabs-container">
                    <Tabs className="tabs" defaultActiveKey="UserManagment" id="profile-tab">
                        <Tab eventKey="UserManagment" title="User Managment">
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "10%" }}>User ID</th>
                                            <th style={{ width: "30%" }}>Username</th>
                                            <th style={{ width: "40%" }}>Active roles</th>
                                            <th style={{ width: "20%" }}></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.props.users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.userName}</td>
                                                <td>{user.roles}</td>
                                                <td><button onClick={() => this.toggle(user)} className="btn btn-info">Edit Roles</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                    <ModalHeader toggle={this.toggle}>Roles</ModalHeader>
                                    <ModalBody>
                                        <form>
                                            <div className="form-check">
                                                {this.state.availableRoles.map(role => (
                                                    <div key={role.name}>
                                                        <input type="checkbox" className="form-check-input" value={role.value} checked={role.isChecked} onChange={this.handleCheckChieldElement} />
                                                        <label>{role.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <button className="btn btn-primary" onClick={this.updateRoles}>Do Something</button>{' '}
                                        <button className="btn btn-primary" onClick={this.toggle}>Cancel</button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </Tab>
                        <Tab eventKey="PhotoManagment" title="Photo Managment">
                            asdas
                        </Tab>
                    </Tabs>
                </div >
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.adminReducer.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getUsersWithRoles: bindActionCreators(adminActions.getUsersWithRoles, dispatch),
            updateRoles: bindActionCreators(adminActions.updateRoles, dispatch),
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
