"use strict";
// @ts-nocheck
/**
 * @name                    appRoutes
 * @namespace           sugar.node.express
 * @type                    Function
 *
 * Register all the app specific routes to handle things like "/app/config", "/app/meta", etc...
 *
 */
module.exports = function (expressInstance) {
    // add the "config" internal squid route
    expressInstance.get('/app/config', require('./controllers/AppControllers').config);
    expressInstance.get('/app/config/*', require('./controllers/AppControllers').config);
    // add the "app" internal squid route
    expressInstance.get('/app/meta', require('./controllers/AppControllers').meta);
    expressInstance.get('/app/meta/*', require('./controllers/AppControllers').meta);
};
//# sourceMappingURL=appRoutes.js.map