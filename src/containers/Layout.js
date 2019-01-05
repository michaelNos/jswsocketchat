import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '../store/actions'

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
        const {title} = this.props
        return ( 
            <div className="container">
                {title}
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
      socket: state.socket,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        initSocket: () => {
            dispatch(actions.initSocket());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);