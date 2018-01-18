import path from 'path';

const pkg = require('../../package');

export const getRepoPath = () => pkg.repository;

export const getExamplePath = name => `${getRepoPath()}/blob/master/demo/src/examples/${name}.js`;

export const getDocumentFetchUrl = doc => {
  const docPath = path.join(getRepoPath(), 'master', `demo/src/docs/${doc}.md`);

  const url = new URL(docPath);
  url.hostname = 'raw.githubusercontent.com';

  return url.href;
}

export const createEntry = (key, fileName, name, description, component) => ({
  [key]: {
    name,
    fileName,
    description,
    component
  }
})