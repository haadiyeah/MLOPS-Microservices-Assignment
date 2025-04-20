const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/auth',
        createProxyMiddleware({
            target: 'http://auth-service:5000',
            changeOrigin: true,
        })
    );

    app.use(
        '/api/data',
        createProxyMiddleware({
            target: 'http://backend-service:5001',
            changeOrigin: true,
        })
    );
};