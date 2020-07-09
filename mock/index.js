/* eslint-disable  */
const path = require('path');
const chokidar = require('chokidar');

const mockDir = path.join(process.cwd(), 'mock');

let mockArr;

const registerRouter = app => {
    const user = require('./user');
    mockArr = [...user];
    let mockLastIndex;
    mockArr.forEach(item => {
        const { type, url, response } = item;
        app[type || 'get'](url, function(req, res) {
            return res.json(
                response instanceof Function ? response(req) : response
            );
        });
        mockLastIndex = app._router.stack.length;
    });
    const mockRoutesLength = Object.keys(mockArr).length;
    return {
        mockRoutesLength: mockRoutesLength,
        mockStartIndex: mockLastIndex - mockRoutesLength
    };
};

const unregisterRouter = () => {
    Object.keys(require.cache).forEach(item => {
        if (item.includes(mockDir)) {
            delete require.cache[require.resolve(item)];
        }
    });
};

const mock = app => {
    const mockRoutes = registerRouter(app);
    var mockRoutesLength = mockRoutes.mockRoutesLength;
    var mockStartIndex = mockRoutes.mockStartIndex;
    chokidar
        .watch(mockDir, {
            ignored: /index.js/,
            ignoreInitial: true
        })
        .on('all', function(event, path) {
            if (event === 'change' || event === 'add') {
                app._router.stack.splice(mockStartIndex, mockRoutesLength);
                unregisterRouter();
                const mockRoutes = registerRouter(app);
                mockRoutesLength = mockRoutes.mockRoutesLength;
                mockStartIndex = mockRoutes.mockStartIndex;
            }
        });
};

module.exports = mock;
