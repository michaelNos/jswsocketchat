import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '../store/actions'
import Message from '../components/Message'

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentWillMount() {
        this.props.connectUser(this.props.user)
        this.props.connectedUsers()
        this.props.createRoom()
        this.props.messageRecived()
    }

    createChat(otherUser, currentUser) {
        this.props.createChat(otherUser, currentUser)
        this.props.createRoom()
        this.scrollToBottom()
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message, this.props.user.email)
        this.scrollToBottom()
    }
    
    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth"});
    }

    render() {

        const { user, users, room, messages } = this.props

        console.log(user);
        console.log(messages);

        let currentUser = {}

        if (users.length > 0) {
            users.forEach((connectedUser, index) => {
                if (connectedUser.email === user.email) {
                    currentUser = users.splice(index, 1)[0]
                }
            });
        }

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
                                                <span>{user.email}</span>
                                            </p>
                                        </div>
                                        <div className="control">
                                            <p className="button is-small is-info is-outlined">
                                                <span className="icon">
                                                    <i className="fa fa-eject"></i>
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
                                    {
                                        users.map((otherUser) => {
                                            return (
                                                <li onClick = {() => {this.createChat(otherUser, currentUser)}} key={otherUser.socketId}>{otherUser.email}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </aside>
                        </div>
                        <div className="column is-9">
                            <div className="box content">
                                {
                                    room ?
                                        <div className="messageBox">
                                            <p className="title">Chat room</p>
                                            {
                                                room.map((roomUser) => {
                                                    return (
                                                        <span key={roomUser.socketId}>{roomUser.email} - </span>
                                                    )
                                                })
                                            }
                                            <div className="messages">
                                                {
                                                    messages.map((message, index) => {
                                                        return (
                                                            <Message message={message.split(/:(.+)/)[0]} sender={message.split(/:(.+)/)[1]} key={index}/>
                                                        )
                                                    })
                                                }
                                                <hr/>
                                                <div style={{ float:"left", clear: "both" }}
                                                    ref={(el) => { this.messagesEnd = el }}>
                                                </div>
                                            </div>
                                            <form onSubmit={this.handleSubmit.bind(this)} className="typing">
                                                <div className="field">
                                                    <p className="control has-icons-left has-icons-right">
                                                        <input 
                                                            className="input" 
                                                            type="text" 
                                                            placeholder="Message"
                                                            required 
                                                            value={this.state.message}
                                                            onChange={(e) => this.setState({message: e.target.value})}/>
                                                        <span className="icon is-small is-left">
                                                            <i className="fa fa-envelope"></i>
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="field is-grouped is-grouped-centered">
                                                    <p className="control">
                                                        <button className="button is-primary">Send</button>
                                                    </p>
                                                </div>
                                            </form>
                                        </div>
                                    :
                                    null
                                }
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
      users: state.users,
      room: state.room,
      messages: state.messages,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        connectUser(user) {
            dispatch(actions.connectUser(user))
        },
        createChat(otherUser, currentUser) {
            dispatch(actions.createChat(otherUser, currentUser))
        },
        createRoom() {
            dispatch(actions.createRoom())
        },
        connectedUsers() {
            dispatch(actions.connectedUsers())
        },
        sendMessage(message, sender) {
            dispatch(actions.sendMessage(message, sender))
        },
        messageRecived() {
            dispatch(actions.messageRecived())
        } 
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);