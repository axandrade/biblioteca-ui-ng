/*eslint-env es6*/
const PROXY_CONFIG = [
{
  context:['/api'],
  target: 'http://localhost:8090/',
  secure: false,
  loglevel: 'debug'
}
];

module.exports = PROXY_CONFIG;
