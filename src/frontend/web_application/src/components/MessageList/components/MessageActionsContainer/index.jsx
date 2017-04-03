import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from '../../../Button';
import Icon from '../../../Icon';
import './style.scss';

const MessageActionsContainer = ({ __, className, ...props }) => {
  const messageActionsContainerClassName = classnames(
    'm-message-actions-container',
    className,
  );

  return (
    <div {...props} className={messageActionsContainerClassName}>
      <Button className="m-message-actions-container__action"><Icon type="reply" spaced /><span>{__('Reply')}</span></Button>
      <Button className="m-message-actions-container__action"><Icon type="share" spaced /><span>{__('Copy To')}</span></Button>
      <Button className="m-message-actions-container__action"><Icon type="tags" spaced /><span>{__('Tags')}</span></Button>
      <Button className="m-message-actions-container__action"><Icon type="trash" spaced /><span>{__('Delete')}</span></Button>
    </div>
  );
};

MessageActionsContainer.propTypes = {
  className: PropTypes.string,
  __: PropTypes.func.isRequired,
};

MessageActionsContainer.defaultProps = {
  className: null,
};

export default MessageActionsContainer;
