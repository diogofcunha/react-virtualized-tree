import path from 'path';

const pkg = require('../../package');

const getRepoPath = () => pkg.repository;

const getFilePath = type => name => path.join(getRepoPath(), `demo/src/${type}/${name}.js`);

export const getExamplePath = getFilePath('examples');
