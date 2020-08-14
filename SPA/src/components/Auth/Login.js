import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/authActions'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        if (username && password) {
            const userData = {
                username: this.state.username,
                password: this.state.password
            }
            this.props.loginUser(userData);
            this.props.history.push('/');
        }

    }


    render() {

        const { isAuthenticated } = this.props;
        const { username, password, submitted } = this.state;

        if (isAuthenticated)
            this.props.history.push('/');

        return (
            <div className="col-md-6 col-md-offset-3 ">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token != null,
        user: state.authReducer.user,
        loading: state.authReducer.loading,
    }
}

export default connect(mapStateToProps, { loginUser })(Login)
