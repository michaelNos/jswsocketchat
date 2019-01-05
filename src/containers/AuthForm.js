import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '../store/actions'

class AuthForm extends Component {
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
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                        <h1 className="title">Authentication Form</h1>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fa fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="Password" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </p>
                        </div>

                        <div className="field is-grouped is-grouped-centered">
                            <p className="control">
                                <button className="button is-primary">Submit</button>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
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
)(AuthForm);