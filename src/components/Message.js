import React from 'react';

const Message = (props) => {
    return (
        <div>
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
                                <span>{props.sender}</span> &nbsp;
                                <span className="tag">{props.message}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
  };

  export default Message;