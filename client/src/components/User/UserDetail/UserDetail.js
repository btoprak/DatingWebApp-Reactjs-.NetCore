import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import *as datingActions from '../../../redux/actions/datingActions';
import './UserDetail.css'
import { Tabs, Tab } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import Moment from 'react-moment'
import MessageThread from '../../Message/MessageThread/MessageThread';
import queryString from 'query-string';

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "about"
        }
        this.handleSelect = this.handleSelect.bind(this)
    }
    handleSelect(key) {
        this.setState({ key });
    }
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.props.actions.getUser(userId);

        if (this.props.location.search != "") {
            let params = queryString.parse(this.props.location.search)
            this.handleSelect(params.tab);
        }
    }

    render() {
        const recipientId = this.props.match.params.userId;
        var user = this.props.user;

        const images = [];
        if (user.photos) {
            for (let i = 0; i < user.photos.length; i++) {
                images.push({
                    original: user.photos[i].url,
                    thumbnail: user.photos[i].url
                });
            }
        }

        return (
            <div>
                <div className="container mt-4">
                    <div className="row">
                        <h4>{user.knownAs}'s Profile</h4>
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
                                    <div className="button-group d-flex">
                                        <button className="btn btn-warning w-100">Like</button>
                                        <button onClick={() => this.handleSelect("messages")} className="btn btn-success w-100">Messages</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="tabs-container">
                                <Tabs className="tabs" activeKey={this.state.key} onSelect={this.handleSelect} id="profile-tab">
                                    <Tab eventKey="about" title={"About " + user.knownAs}>
                                        <h4>Description</h4>
                                        <p>{user.introduction}</p>
                                        <h4>Looking For</h4>
                                        <p>{user.lookingFor}</p>
                                    </Tab>
                                    <Tab eventKey="interests" title="Interests">
                                        <h4>Interests</h4>
                                        <p>{user.interests}</p>
                                    </Tab>
                                    <Tab eventKey="photos" title="Photos">
                                        <ImageGallery items={images} />
                                    </Tab>
                                    <Tab eventKey="messages" title="Messages">
                                        <MessageThread recipientId={recipientId}></MessageThread>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.datingReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getUser: bindActionCreators(datingActions.getUser, dispatch),
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);