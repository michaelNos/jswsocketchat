import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '../store/actions'
import AuthForm from './AuthForm'
import Chat from './Chat'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    componentWillMount() {
        this.props.initSocket()
    }

    componentWillReceiveProps(nextProps) {
        const token = localStorage.getItem("token")

        if (token === nextProps.user.token) {
            this.setState({"loggedIn": true})
        } else {
            this.setState({"loggedIn": false})
        }
    }

    render() {
        let { loggedIn } = this.state
        return ( 
            <div className="container">
                {
                    loggedIn ? <Chat /> : <AuthForm />
                }
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
      socket: state.socket,
      user: state.user,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        initSocket() {
            dispatch(actions.initSocket());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);