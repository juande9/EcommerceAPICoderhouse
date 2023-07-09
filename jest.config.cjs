/** @type {import('jest').Config} */
const config = {
    verbose: true,
    silent: true,
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    testRegex: '\\.test\\.jsx?$',
    detectOpenHandles: true
  };
  
  module.exports = config;
  