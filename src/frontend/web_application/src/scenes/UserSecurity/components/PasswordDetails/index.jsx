import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import { PasswordStrength } from '../../../../components/form';
import PasswordForm from '../PasswordForm';
import TextBlock from '../../../../components/TextBlock';
import './style.scss';

class PasswordDetails extends Component {
  static propTypes = {
    __: PropTypes.func.isRequired,
    user: PropTypes.shape({}).isRequired,
    // updateContact: PropTypes.func,
  };

  static defaultProps = {
    onUpdateContact: str => str,
  }

  state = {
    editMode: false,
  }

  toggleEditMode = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  }

  render() {
    const { __, user } = this.props;

    return (
      <div className="m-password-details">
        {!this.state.editMode &&
          <TextBlock className="m-password-details__title">{__('password.details.password_strength.title')}</TextBlock>
        }
        {this.state.editMode ?
          <div className="m-password-details__form">
            <PasswordForm __={__} user={user} onCancel={this.toggleEditMode} />
          </div>
        :
          <PasswordStrength
            className="m-password-details__strength"
            strength={user.privacy_features.password_strength}
          />
        }
        {!this.state.editMode &&
          <div className="m-password-details__action">
            <Button onClick={this.toggleEditMode}>{__('password.details.action.change')}</Button>
          </div>
        }
      </div>
    );
  }
}

export default PasswordDetails;