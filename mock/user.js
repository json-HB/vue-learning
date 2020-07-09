const Mock = require('mockjs');

module.exports = [
    {
        url: '/getUser',
        type: 'get',
        response() {
            return Mock.mock({
                name: '@name',
                'age|25-60': 40,
                'sex|1': ['man', 'women'],
                title: '@title',
                ip: '@ip',
                province: '@province',
                city: '@city',
                county: '@county',
                id: '@id',
                csentence: '@csentence',
                color: '@color'
            });
        }
    },
    {
        url: '/login',
        type: 'get',
        response() {
            return Mock.mock({
                token: '@guid'
            });
        }
    },
    {
        url: '/response',
        type: 'get',
        response: {
            data: {
                name: Mock.mock('@name')
            }
        }
    },
    {
        url: '/pornhub',
        type: 'get',
        response: {
            data: {
                name: Mock.mock('@title')
            }
        }
    },
    {
        url: '/form',
        type: 'post',
        response() {
            return Mock.mock({
                'code|1': [0, 200, 300, 400]
            });
        }
    },
    {
        url: '/test',
        type: 'get',
        response() {
            return Mock.mock({
                'code|1': [0, 200, 300, 400]
            });
        }
    }
];
