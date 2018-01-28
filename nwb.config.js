module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'reactVirtualizedTree',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    uglify: false,
    html: {
      template: 'demo/src/index.html'
    }
  }
}
