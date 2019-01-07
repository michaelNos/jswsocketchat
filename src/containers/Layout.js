import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '../store/actions'
import AuthForm from './AuthForm'
import Chat from './Chat'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.props.initSocket()
    }

    render() {
        let { loading, verified } = this.props
        
        if (loading) {
            return <div>Loading ...</div>
        }

        return ( 
            <div className="container">
                {
                    verified ? <Chat /> : <AuthForm />
                }
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
      socket: state.socket,
      user: state.user,
      loading: state.loading,
      verified: state.verified
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