import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import *as messageActions from '../../../redux/actions/messageActions';
import './MessageThread.css'
import Moment from 'react-moment'
import { Form } from 'reactstrap';

class MessageThread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const userId = this.props.authUser.id;
        await this.props.actions.getMessageThread(userId, this.props.recipientId);

        const messages = this.props.messageThread;
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].isRead === false && messages[i].recipientId == userId) {
                this.props.actions.markAsReadMessage(userId, messages[i].id);
            }
        }
    }

    getSnapshotBeforeUpdate = (prevProps) => {
        const { message } = this.props;
        if (prevProps.message !== message) {
            return true;
        }
        return false;
    };

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const recipientId = this.props.recipientId;
        const userId = this.props.authUser.id
        if (snapshot) {
            this.props.actions.getMessageThread(userId, recipientId);
        }
    };

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    async sendMessage(event) {
        event.preventDefault();
        const recipientId = this.props.recipientId;
        var data = {
            recipientId: parseInt(recipientId, 10),
            content: this.state.content
        }
        const userId = this.props.authUser.id
        await this.props.actions.sendMessage(userId, data);

        var form = document.getElementById("sendMessageForm");
        form.reset();
    }

    render() {
        console.log("asd");
        return (
            <div>
                <div className="card">
                    <div className="card-body card-bodyy">
                        <ul className="chat">
                            {this.props.messageThread ?
                                this.props.messageThread.map(message => (
                                    <li key={message.id}>
                                        {message.senderId == this.props.recipientId ?
                                            <div>
                                                <span className="chat-img float-left">
                                                    <img src={message.senderPhotoUrl} alt={message.senderKnownAs} className="rounded-circle" />
                                                </span>
                                                <div className="chat-body">
                                                    <div className="header">
                                                        <strong>{message.senderKnownAs}</strong>
                                                        <small className="text-muted float-right">
                                                            <span className="fa fa-clock-o"><Moment fromNow date={message.messageSent} /></span>
                                                        </small>
                                                    </div>
                                                    <p>{message.content}</p>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <span className="chat-img float-right">
                                                    <img src={message.senderPhotoUrl} alt={message.senderKnownAs} className="rounded-circle" />
                                                </span>
                                                <div className="chat-body">
                                                    <div className="header">
                                                        <small className="text-muted">
                                                            <span className="fa fa-clock-o"><Moment fromNow date={message.messageSent} /></span>
                                                            {!message.isRead ?
                                                                <span className="text-danger">(unread)</span> :
                                                                <span className="text-success">(Read <Moment fromNow date={message.dateRead} /> )</span>}
                                                        </small>
                                                        <strong className="primary-font float-right">{message.senderKnownAs}</strong>
                                                    </div>
                                                    <p>{message.content}</p>
                                                </div>
                                            </div>}
                                    </li>
                                )) : <p>No messages yet... say hi my using the message box below</p>}
                        </ul>
                    </div>
                    <div className="card-footer">
                        <Form id="sendMessageForm" onSubmit={this.sendMessage}>
                            <div className="input-group">
                                <input type="text"
                                    className="form-control input-sm"
                                    placeholder="send a private message"
                                    name="content"
                                    onChange={this.handleChange}
                                />
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        messageThread: state.messageReducer.messageThread,
        authUser: state.authReducer.user,
        message: state.messageReducer.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getMessageThread: bindActionCreators(messageActions.getMessageThread, dispatch),
            sendMessage: bindActionCreators(messageActions.sendMessage, dispatch),
            markAsReadMessage: bindActionCreators(messageActions.markAsReadMessage, dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageThread);
