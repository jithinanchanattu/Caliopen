import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18nProvider } from 'lingui-react';
import { unpackCatalog } from 'lingui-i18n';
import { getLanguage } from '../../';

// eslint-disable-next-line import/no-extraneous-dependencies
const linguiDev = process.env.NODE_ENV !== 'production' ? require('lingui-i18n/dev') : undefined;

class I18nLoader extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    catalogs: {},
  }

  componentDidMount() {
    this.loadCatalog(this.getLanguageFromProps(this.props));
  }

  shouldComponentUpdate(nextProps, nextState) {
    const language = this.getLanguageFromProps(nextProps);
    const { catalogs } = nextState;

    if (language !== this.getLanguageFromProps(this.props) && !catalogs[language]) {
      this.loadCatalog(language);

      return false;
    }

    return true;
  }

  getLanguageFromProps = props => getLanguage([props.locale])

  loadCatalog = async (language) => {
    const catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `../../../../../locale/${language}/messages.js`);

    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: unpackCatalog(catalog),
      },
    }));
  }

  render() {
    const { children } = this.props;
    const { catalogs } = this.state;
    const language = this.getLanguageFromProps(this.props);

    // Skip rendering when catalog isn't loaded.
    if (!catalogs[language]) {
      return null;
    }

    return (
      <I18nProvider language={language} catalogs={catalogs} development={linguiDev}>
        {children}
      </I18nProvider>
    );
  }
}

export default I18nLoader;
