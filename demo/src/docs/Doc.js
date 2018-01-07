import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown';

import documents from './';
import { getDocumentFetchUrl } from '../toolbelt';

export default class Doc extends Component {
  state = {
    doc: null
  }

  componentDidMount() {
    const { match: { params: { document } } } = this.props;
    
    this.getDocument(document);
  }

  getDocument = (doc) => {
    return fetch(getDocumentFetchUrl(doc))
      .then(r => r.text())
      .then(doc => { this.setState({ doc }) }
    );
  }

  componentWillReceiveProps({ match: { params: { document } } }) {
    const { match: { params: { document: selectedDocument } } } = this.props;

    if (document !== selectedDocument) {
      this.setState({ doc: null }, () => {
        this.getDocument(document);
      });
    }
  }

  render() {
    const { doc } = this.state;

    return (
      !doc ?
        <Loader active inline='centered' /> :
        <ReactMarkdown source={doc} />
    )
  }
}