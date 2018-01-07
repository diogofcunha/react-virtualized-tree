import path from 'path';

const pkg = require('../../package');

export const getRepoPath = () => pkg.repository;

const getFilePath = type => name => path.join(getRepoPath(), `demo/src/${type}/${name}`);

export const getExamplePath = name => `${getFilePath('examples')(name)}.js`;

export const getDocumentFetchUrl = doc => {
  const docPath = path.join(getRepoPath(), 'master', `demo/src/docs/${doc}.md`);

  const url = new URL(docPath);
  url.hostname = 'raw.githubusercontent.com';

  return url.href;
}
