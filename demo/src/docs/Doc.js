import React, {Component} from 'react';
import {Loader} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

import documents from './';
import {getDocumentFetchUrl} from '../toolbelt';

import {polyfill} from 'react-lifecycles-compat';

class Doc extends Component {
  state = {
    doc: null,
  };

  componentDidMount() {
    const {
      match: {
        params: {document},
      },
    } = this.props;

    this.getDocument(document);
  }

  getDocument = doc => {
    return fetch(getDocumentFetchUrl(doc))
      .then(r => r.text())
      .then(doc => {
        this.setState({doc});
      });
  };

  UNSAFE_componentWillReceiveProps({
    match: {
      params: {document},
    },
  }) {
    const {
      match: {
        params: {document: selectedDocument},
      },
    } = this.props;

    if (document !== selectedDocument) {
      this.setState({doc: null}, () => {
        this.getDocument(document);
      });
    }
  }

  render() {
    const {doc} = this.state;

    return !doc ? <Loader active inline="centered" /> : <ReactMarkdown source={doc} />;
  }
}

polyfill(Doc);

export default Doc;
