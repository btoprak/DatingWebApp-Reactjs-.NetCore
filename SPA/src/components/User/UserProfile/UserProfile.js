import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import *as datingActions from '../../../redux/actions/datingActions';
import { Tabs, Tab } from 'react-bootstrap';
import './UserProfile.css'
import alertify from 'alertifyjs'
import Moment from 'react-moment'

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            user: {},
            submitDisabled: true,
            selectedFile: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(e) {
        const user = Object.assign({}, this.state.user, { [e.target.name]: e.target.value });
        this.setState({ user, submitDisabled: false });
    }

    handleSave(e) {
        e.preventDefault();
        const updatedUser = this.state.user;
        console.log(updatedUser);
        this.props.actions.updateUser(updatedUser);

    }

    async componentDidMount() {
        const userId = parseInt(this.props.match.params.userId);
        if (userId === parseInt(this.props.authUser.id)) {
            await this.props.actions.getUser(userId);
            const userInfo = this.props.user;
            this.setState({ user: userInfo });
        }
        else { this.props.history.push("/"); }
    }

    fileSelectedHandler = e => {
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    fileUploadHandler = () => {
        let file = this.state.selectedFile
        const userId = this.props.match.params.userId;
        if (file != null) {
            let fd = new FormData();
            fd.append('file', file);
            this.props.actions.uploadUserPhoto(userId, fd);
        } else {
            console.log("resim yok");
        }
    }

    setMainPhoto = (photoId) => {
        const userId = this.props.match.params.userId;
        this.props.actions.setMainPhoto(userId, photoId);
    }

    deleteUserPhoto = (photoId) => {
        const userId = this.props.match.params.userId;
        alertify.confirm("Are you sure you want to delete this photo?", () => {
            this.props.actions.deleteUserPhoto(userId, photoId);
        })

    }

    render() {

        const user = this.state.user
        return (
            <div>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="row">
                                <h2>Your Profile</h2>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="alert alert-info">
                                <strong>Information:</strong>You have made changes. Any unsaved changes will be lost!
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card">
                                <img className="img-thumbnail" src={user.photoUrl || require('../../../assets/image/default-profile.png')} alt={user.knowsAs}></img>
                                <div className="card-body">
                                    <div>
                                        <strong>Location:</strong>
                                        <p>{user.city} , {user.country}</p>
                                    </div>
                                    <div>
                                        <strong>Age:</strong>
                                        <p>{user.age}</p>
                                    </div>
                                    <div>
                                        <strong>Last Active:</strong>
                                        <p><Moment fromNow date={this.props.user.lastActive} /></p>
                                    </div>
                                    <div>
                                        <strong>Member since:</strong>
                                        <p><Moment fromNow date={this.props.user.created} /></p>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button disabled={this.state.submitDisabled} form="editProfile" className="btn btn-success btn-block">Save Changes</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="tabs-container">
                                <Tabs className="tabs" defaultActiveKey="about" id="profile-tab">
                                    <Tab eventKey="about" title="Edit Profile">
                                        <form id="editProfile" onSubmit={this.handleSave}>
                                            <h4>Description</h4>
                                            <textarea onChange={this.handleChange} name="introduction" rows="6" className="form-control" value={user.introduction}></textarea>
                                            <h4>Looking For</h4>
                                            <textarea onChange={this.handleChange} name="lookingFor" rows="6" className="form-control" value={user.lookingFor}></textarea>
                                            <h4>Interests</h4>
                                            <textarea onChange={this.handleChange} name="interests" rows="6" className="form-control" value={user.interests}></textarea>
                                            <h4>Location Details:</h4>
                                            <div className="form-inline">
                                                <label htmlFor="city">City:</label>
                                                <input onChange={this.handleChange} className="form-control" type="text" name="city" value={user.city} />
                                                <label htmlFor="city">Country:</label>
                                                <input onChange={this.handleChange} className="form-control" type="text" name="country" value={user.country} />
                                            </div>
                                        </form>
                                    </Tab>
                                    <Tab eventKey="photos" title="Edit Photos">
                                        {user.photos ?
                                            <div className="row p-2">
                                                {user.photos.map(photo => (
                                                    <div className="col-sm-2" key={photo.id}>
                                                        <img src={photo.url} className="img-thumbnail p-1" alt=""></img>
                                                        <div className="text-center">
                                                            <button disabled={photo.isMain ? true : false} onClick={() => this.setMainPhoto(photo.id)} type="button" className={photo.isMain ? "btn btn-sm btn-secondary" : "btn btn-sm btn-success active"}>Main</button>
                                                            <button onClick={() => this.deleteUserPhoto(photo.id)} type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash-o"></i></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div> : ""
                                        }
                                        <input type="file" onChange={this.fileSelectedHandler} />
                                        <button className="btn btn-info" onClick={this.fileUploadHandler}>Upload</button>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.datingReducer.user,
        authUser: state.authReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getUser: bindActionCreators(datingActions.getUser, dispatch),
            updateUser: bindActionCreators(datingActions.updateUser, dispatch),
            uploadUserPhoto: bindActionCreators(datingActions.uploadUserPhoto, dispatch),
            setMainPhoto: bindActionCreators(datingActions.setMainPhoto, dispatch),
            deleteUserPhoto: bindActionCreators(datingActions.deleteUserPhoto, dispatch),
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);