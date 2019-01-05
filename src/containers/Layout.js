import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '../store/actions'
import AuthForm from './AuthForm'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.props.initSocket()
        console.log(this)
    }    

    render() { 
        return ( 
            <div className="container">
                <AuthForm />
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
        },
        connectUser(user) {
            dispatch(actions.connectUser(user));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);