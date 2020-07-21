import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import *as datingActions from '../../../redux/actions/datingActions';
import { Pagination, PaginationItem, PaginationLink, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';


class UserLikes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            pages: [],
            pageSize: 4,
            minAge: 18,
            maxAge: 99,
            gender: "",
            likes: "Likers",
        }
    }

    async componentDidMount() {
        const { currentPage, pageSize, minAge, maxAge, gender, orderBy, likes } = this.state
        await this.props.actions.getUsers(currentPage, pageSize, minAge, maxAge, gender, orderBy, likes);
    }

    likesHandler = (likes) => {
        this.setState({ likes: likes, pages: [] })
        const { currentPage, pageSize, minAge, maxAge, gender, orderBy } = this.state
        this.props.actions.getUsers(currentPage, pageSize, minAge, maxAge, gender, orderBy, likes);
    }

    paginate = pageNumber => {
        this.setState({ currentPage: pageNumber })
        const { pageSize, minAge, maxAge, gender, orderBy, likes } = this.state
        this.props.actions.getUsers(pageNumber, pageSize, minAge, maxAge, gender, orderBy, likes);
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
            <div className="container mt-5">
                <div className="text-center">
                    <h2>Your matches - {this.props.users.length} found</h2>
                </div>
                <div className="row">
                    <div className="btn-group">
                        <button className={this.state.likes === "Likers" ? "btn btn-primary active" : "btn btn-primary"} onClick={() => this.likesHandler("Likers")}>Members who like me</button>
                        <button className={this.state.likes === "Likees" ? "btn btn-primary active" : "btn btn-primary"} onClick={() => this.likesHandler("Likees")}>Members who I like</button>
                    </div>
                </div>


                <div className="row">
                    {this.props.users.map(user => (
                        <div className="col-md-2" key={user.id}>
                            <div className="card mb-4" style={{ width: 160 }}>
                                <div className="card-img-wrapper">
                                    <img src={user.photoUrl || require('../../../assets/image/default-profile.png')} className="card-img-top" alt={user.knownAs} />
                                    <ul className="list-inline member-icons animate text-center">
                                        <li className="list-inline-item"><Link to={"/user/" + user.id}><button className="btn btn-warning"><i className="fa fa-user"></i></button></Link></li>
                                        <li className="list-inline-item"><button className="btn btn-warning"><i onClick={() => this.sendLike(user)} className="fa fa-heart"></i></button></li>
                                        <li className="list-inline-item"><button className="btn btn-warning"><i className="fa fa-envelope"></i></button></li>
                                    </ul>
                                </div>
                                <div className="card-body p-1">
                                    <h6 className="card-title text-center mb-1"><i className="fa fa-user"></i>
                                        {user.knownAs}, {user.age}</h6>
                                    <p className="card-text text-muted text-center">{user.city}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.datingReducer.users,
        pagination: state.datingReducer.pagination
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getUsers: bindActionCreators(datingActions.getUsers, dispatch),
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLikes);