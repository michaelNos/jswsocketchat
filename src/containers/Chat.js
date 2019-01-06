import React, { Component } from 'react'
import { connect } from 'react-redux';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {}

    render() {
        return ( 
            <div className="container">
                Chat
            </div>
        );
    }
}


export default connect(
    null,
    null
)(Chat);