import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '../store/actions'

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.props.connectUser(this.props.user)
    }

    render() {

        const { user, socket } = this.props
        console.log(user, socket)
        return ( 
            <div className="container">
                <nav className="navbar is-white topNav">
                    <div className="container">
                        <div id="topNav" className="navbar-menu">
                            <div className="navbar-start"></div>
                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <div className="field is-grouped">
                                        <div className="control">
                                            <p className="is-small">
                                                <span className="icon">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                                <span>
                                                    User
                                                </span>
                                            </p>
                                        </div>
                                        <div className="control">
                                            <p className="button is-small is-info is-outlined">
                                                <span className="icon">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                                <span>Logout</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <hr/>
                <section className="container chatbox">
                    <div className="columns">
                        <div className="column is-3">
                            <aside className="menu">
                                <p className="menu-label">
                                    Connected users
                                </p>
                                <ul className="menu-list">
                                    users
                                </ul>
                            </aside>
                        </div>
                        <div className="column is-9">
                            <div className="box content">
                                <article className="post">
                                    <div className="media">
                                        <div className="media-left">
                                            <p className="image is-32x32">
                                                <img src="http://bulma.io/images/placeholders/128x128.png" alt="is-32x32"/>
                                            </p>
                                        </div>
                                        <div className="media-content">
                                            <div className="content">
                                                <p>
                                                    <span>@jsmith</span> replied 34 minutes ago &nbsp;
                                                    <span className="tag">Question</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="media-right">
                                            <span className="has-text-grey-light"><i className="fa fa-comments"></i> 1</span>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
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
        connectUser(user) {
            dispatch(actions.connectUser(user));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);