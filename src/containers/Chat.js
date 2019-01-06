import React, { Component } from 'react'
import { connect } from 'react-redux';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {}

    render() {

        const { user, socket } = this.props
        console.log(user, socket)
        return ( 
            <div className="container">
                Chat
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

export default connect(
    mapStateToProps,
    null
)(Chat);