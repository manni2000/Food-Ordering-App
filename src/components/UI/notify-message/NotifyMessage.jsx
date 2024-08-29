import React from 'react';
import '../../../styles/notify-message.css';

const NotifyMessage = (props) => {
  const { content, status } = props;

  return (
    <>
      {status === 'failure' && (
        <div className="notify-message notify-message__failure">
          <span>
            <i className="ri-close-circle-line"></i>You {content} failure!
          </span>
          <i className="ri-emotion-unhappy-line"></i>
        </div>
      )}

      {status === 'succeed' && (
        <div className="notify-message">
          <span>
            <i className="ri-checkbox-circle-line"></i>You {content} succeed!
          </span>
          <i className="ri-emotion-happy-line"></i>
        </div>
      )}
    </>
  );
};

export default NotifyMessage;
