const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'reactVirtualizedTree',
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-virtualized': 'ReactVirtualized',
      },
    },
  },
  webpack: {
    extra: {
      plugins: [new StatsPlugin('/stats.json')],
    },
    uglify: false,
    html: {
      template: 'demo/src/index.html',
    },
  },
};
