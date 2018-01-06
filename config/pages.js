const ghpages = require('gh-pages');

ghpages.publish('demo/dist', err => { throw err });
