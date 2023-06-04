const path = require('path');

module.exports = {
  // остальные настройки webpack...

  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
};
