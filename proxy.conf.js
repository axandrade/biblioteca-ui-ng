/*eslint-env es6*/
const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:8080',
        secore: false,
        logLevel: 'debug'
    }
];

module.exports = PROXY_CONFIG;
