import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import *as messageActions from '../../redux/actions/messageActions';
import './MessageList.css'
import Moment from 'react-moment'
import { Pagination, PaginationItem, PaginationLink, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import alertify from "alertifyjs";

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 5,
            messageContainer: "Unread",
            pages: [],
        }
    }

    async componentDidMount() {
        const userId = this.props.authUser.id;
        const { currentPage, pageSize, messageContainer } = this.state;
        await this.props.actions.getMessages(userId, currentPage, pageSize, messageContainer);
        this.setState({ messages: this.props.messages });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.message !== this.props.message || prevState.currentPage !== this.state.currentPage
            || prevState.messageContainer !== this.state.messageContainer) {
            const userId = this.props.authUser.id;
            const { currentPage, pageSize, messageContainer } = this.state;
            this.props.actions.getMessages(userId, currentPage, pageSize, messageContainer);
        }
    }

    getMessages = (messageContainer) => {
        // const userId = this.props.authUser.id;
        this.setState({ messageContainer: messageContainer, pages: [] })
        // const { currentPage, pageSize } = this.state
        // this.props.actions.getMessages(userId, currentPage, pageSize, messageContainer);
    }

    deleteMessage = (message) => {
        const userId = this.props.authUser.id;
        alertify.confirm('Are you sure you want to delete this message', () => {
            this.props.actions.deleteMessage(userId, message);
        })
    }

    paginate = pageNumber => {
        this.setState({ currentPage: pageNumber })
    }

    render() {
        if (this.state.pages.length) {
            while (this.state.pages.length > 0) {
                this.state.pages.pop();
            }
        }
        if (!this.state.pages.length) {
            var pagination = JSON.parse(this.props.pagination);
            if (pagination != null) {
                for (let i = 1; i <= pagination.totalPages; i++) {
                    this.state.pages.push(i);
                }
            }
        }

        return (
            <div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="btn-group">
                            <button className={this.state.messageContainer === "Unread" ? "btn btn-primary active" : "btn btn-primary"} onClick={() => this.getMessages("Unread")}><i className="fa fa-envelope"></i> Unread</button>
                            <button className={this.state.messageContainer === "Inbox" ? "btn btn-primary active" : "btn btn-primary"} onClick={() => this.getMessages("Inbox")}><i className="fa fa-envelope-open"></i> Inbox</button>
                            <button className={this.state.messageContainer === "Unbox" ? "btn btn-primary active" : "btn btn-primary"} onClick={() => this.getMessages("Outbox")}><i className="fa fa-paper-plane"></i> Outbox</button>
                        </div>
                    </div >
                    <div className="row" >
                        <table className="table table-hover" style={{ cursor: "pointer" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "40%" }}>Message</th>
                                    <th style={{ width: "20%" }}>From / To</th>
                                    <th style={{ width: "20%" }}>Sent / Received</th>
                                    <th style={{ width: "20%" }}></th>
                                </tr>
                            </thead>
                            {this.props.messages ?
                                <tbody>
                                    {this.props.messages.map(message => (
                                        <tr key={message.id}>
                                            {this.state.messageContainer !== "Outbox" ?
                                                <td><Link to={{ pathname: "/user/" + message.senderId, search: "?tab=messages" }}> {message.content}</Link></td> :
                                                <td><Link to={{ pathname: "/user/" + message.recipientId, search: "?tab=messages" }}> {message.content}</Link></td>}

                                            <td>
                                                {this.state.messageContainer !== "Outbox" ?
                                                    <div>
                                                        <img src={message.senderPhotoUrl} className="img-circle rounded-circle" alt="" />
                                                        <strong>{message.senderKnownAs}</strong>
                                                    </div>
                                                    : <div>
                                                        <img src={message?.recipientPhotoUrl} className="img-circle rounded-circle" alt="" />
                                                        <strong>{message.recipientKnownAs}</strong>
                                                    </div>}
                                            </td >
                                            <td><Moment fromNow date={message.messageSent} /></td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => this.deleteMessage(message)}>Delete</button>
                                            </td>
                                        </tr >
                                    ))}</tbody>
                                : <div className="row">
                                    <h3>No messages</h3>
                                </div >}
                        </table >
                    </div >
                    {
                        this.state.pages ?
                            <Pagination className="Pagination" aria-label="Page navigation example">
                                <PaginationItem disabled>
                                    <PaginationLink first href="#" />
                                </PaginationItem>
                                <PaginationItem disabled>
                                    <PaginationLink previous href="#" />
                                </PaginationItem>
                                {this.state.pages.map(pageNumber => (
                                    <PaginationItem key={pageNumber} active={this.state.currentPage === pageNumber ? true : false}>
                                        <PaginationLink onClick={() => this.paginate(pageNumber)}>{pageNumber}</PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationLink next onClick={() => this.nextPage()} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink last href="#" />
                                </PaginationItem>
                            </Pagination>
                            : <Spinner />
                    }
                </div >
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messageReducer.messages,
        pagination: state.messageReducer.pagination,
        authUser: state.authReducer.user,
        message: state.messageReducer.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getMessages: bindActionCreators(messageActions.getMessages, dispatch),
            deleteMessage: bindActionCreators(messageActions.deleteMessage, dispatch),
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
