import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import *as datingActions from '../../redux/actions/datingActions';
import './UserList.css'
import { Link } from 'react-router-dom';
import { Spinner, Pagination } from 'react-bootstrap';
import { PaginationItem, PaginationLink } from 'reactstrap';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 5,
            minAge: 18,
            maxAge: 99,
            gender: "",
            page: [],
        }

    }
    async componentDidMount() {
        const { currentPage, pageSize, minAge, maxAge, gender, orderBy } = this.state;
        await this.props.actions.getUsers(currentPage, pageSize, minAge, maxAge, gender, orderBy);
    }

    paginate = pageNumber => {
        this.setState({ currentPage: pageNumber })
        this.props.actions.getUsers(pageNumber, this.state.pageSize);

    }

    handleChangeFilters = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    submitFilter = (e) => {
        e.preventDefault();
        const { currentPage, pageSize, minAge, maxAge, gender, orderBy } = this.state;
        this.props.actions.getUsers(currentPage, pageSize, minAge, maxAge, gender, orderBy);
    }

    resetFilter = (e) => {
        e.preventDefault();
        const { currentPage, pageSize } = this.state;
        this.props.actions.getUsers(currentPage, pageSize);
    }

    orderBy = (order) => {
        const { currentPage, pageSize, minAge, maxAge, gender } = this.state;
        this.props.actions.getUsers(currentPage, pageSize, minAge, maxAge, gender, order);
    }

    sendLike = (recipient) => {
        const userId = this.props.authUser.id
        this.props.actions.sendLike(userId, recipient)
    }

    render() {

        if (this.state.page.length) {
            while (this.state.page.length > 0) {
                this.state.page.pop();
            }
        }
        if (!this.state.page.length) {
            var pagination = JSON.parse(this.props.pagination);
            if (pagination != null) {
                for (let i = 1; i <= pagination.totalPages; i++) {
                    this.state.page.push(i);
                }
            }
        }
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <h2>Your matches - {this.props.users.length} found</h2>
                </div>

                <div className="row">
                    <form className="form-inline" noValidate onSubmit={this.submitFilter}>
                        <div className="form-group">
                            <label htmlFor="minAge">Age From</label>
                            <input type="number" value={this.state.minAge} onChange={this.handleChangeFilters} className="form-control" style={{ width: "70px" }} id="minAge" name="minAge" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="maxAge">Age To</label>
                            <input type="number" value={this.state.maxAge} onChange={this.handleChangeFilters} className="form-control" style={{ width: "70px" }} id="maxAge" name="maxAge" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Show: </label>
                            <select className="form-control"
                                style={{ width: 130 }}
                                id="gender"
                                name="gender"
                                value={this.state.gender}
                                onChange={this.handleChangeFilters}>
                                <option value="male">
                                    Male
                            </option>
                                <option value="female">
                                    Female
                            </option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginLeft: "10px" }}>Apply Filters</button>
                        <button type="button" className="btn btn-info" style={{ marginLeft: "10px" }} onClick={this.resetFilter}>Reset Filter</button>
                    </form>
                    <div className="pull-right">
                        <label style={{ marginRight: "10px" }}>Order By: </label>
                        <div className="btn-group">
                            <button type="button" name="orderBy" className="btn btn-primary" onClick={() => this.orderBy("lastActive")}>Last Active</button>
                            <button type="button" name="orderBy" className="btn btn-primary" onClick={() => this.orderBy("created")}>Newest Members</button>
                        </div>
                    </div>
                </div>
                <br />

                <div className="row">
                    {this.props.users.map(user => (
                        <div className="col-md-2" key={user.id}>
                            <div className="card mb-4" style={{ width: 160 }}>
                                <div className="card-img-wrapper">
                                    <img src={user.photoUrl || require('../../assets/image/default-profile.png')} className="card-img-top" alt={user.knownAs} />
                                    <ul className="list-inline member-icons animate text-center">
                                        <li className="list-inline-item"><Link to={"/user/" + user.id}><button className="btn btn-warning"><i className="fa fa-user"></i></button></Link></li>
                                        <li className="list-inline-item"><button className="btn btn-warning"><i onClick={() => this.sendLike(user)} className="fa fa-heart"></i></button></li>
                                        <li className="list-inline-item"><Link to={{ pathname: "/user/" + user.id, search: "?tab=messages" }}><button className="btn btn-warning"><i className="fa fa-envelope"></i></button></Link></li>
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
                    this.state.page ?
                        <Pagination className="Pagination" aria-label="Page navigation example">
                            <PaginationItem disabled>
                                <PaginationLink first href="#" />
                            </PaginationItem>
                            <PaginationItem disabled>
                                <PaginationLink previous href="#" />
                            </PaginationItem>

                            {this.state.page.map(pageNumber => (
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

        )
    }
}


const mapStateToProps = state => {
    return {
        users: state.datingReducer.users,
        pagination: state.datingReducer.pagination,
        authUser: state.authReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            getUsers: bindActionCreators(datingActions.getUsers, dispatch),
            sendLike: bindActionCreators(datingActions.sendLike, dispatch)
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);