'use strict';
module.exports = {
    server: { // dev server 配置
        port: 8080,
        host: 'localhost',
        proxy: {
            "/api": {
                "target": {
                    "host": "www.google.com",
                    "protocol": 'http:',
                    "port": 80
                },
                // ignorePath: true,
                changeOrigin: true,
                secure: false
            }
        }
    },
    apiUrl: "/api" // api Base 地址配置
};