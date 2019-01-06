import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '../store/actions'

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    
    componentWillMount() {
        if (this.props.user.hasOwnProperty('error')) {
            this.setState({"error": this.props.user.error})
        } else {
            this.setState({"error": ''})
            this.props.verify()
        }
    }
    

    handleSubmit(e) {
        e.preventDefault();
        this.props.authenticate(this.state.email, this.state.password)
    }    

    render() {
        const { error } = this.state

        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            <h1 className="title">Authentication Form</h1>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="field">
                                    <p className="control has-icons-left has-icons-right">
                                        <input 
                                            className="input" 
                                            type="email" 
                                            placeholder="Email"
                                            required 
                                            value={this.state.email}
                                            onChange={(e) => this.setState({email: e.target.value})}/>
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
                                        <input 
                                            className="input" 
                                            type="password" 
                                            placeholder="Password" 
                                            required
                                            value={this.state.password}
                                            onChange={(e) => this.setState({password: e.target.value})}/>
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </p>
                                </div>

                                {error}

                                <div className="field is-grouped is-grouped-centered">
                                    <p className="control">
                                        <button className="button is-primary">Submit</button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return {
      user: state.user,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        authenticate(email, password) {
            dispatch(actions.authenticate(email, password));
        },
        verify() {
            dispatch(actions.verify());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm);