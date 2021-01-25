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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwUm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxlQUFlO0lBQ3hDLHdDQUF3QztJQUN4QyxlQUFlLENBQUMsR0FBRyxDQUNqQixhQUFhLEVBQ2IsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsTUFBTSxDQUMvQyxDQUFDO0lBQ0YsZUFBZSxDQUFDLEdBQUcsQ0FDakIsZUFBZSxFQUNmLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE1BQU0sQ0FDL0MsQ0FBQztJQUVGLHFDQUFxQztJQUNyQyxlQUFlLENBQUMsR0FBRyxDQUNqQixXQUFXLEVBQ1gsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsSUFBSSxDQUM3QyxDQUFDO0lBQ0YsZUFBZSxDQUFDLEdBQUcsQ0FDakIsYUFBYSxFQUNiLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FDN0MsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9