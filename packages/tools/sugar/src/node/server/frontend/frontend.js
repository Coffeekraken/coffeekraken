"use strict";
const __mimeTypes = require('mime-types');
const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __SPromise = require('../../promise/SPromise');
const __express = require('express');
const __trimLines = require('../../string/trimLines');
const __SError = require('../../error/SError');
const __STemplate = require('../../template/STemplate');
const __deepMap = require('../../object/deepMap');
const __extension = require('../../fs/extension');
const __packageRoot = require('../../path/packageRoot');
/**
 * @name                express
 * @namespace           sugar.node.server.frontend
 * @type                Function
 *
 * This function take care of starting a frontend express based server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {express}                       The server instance started
 *
 * @event         log       Some informations that you can or not display to your users
 *
 * @example       js
 * const frontendServer = require('@coffeekraken/sugar/node/server/frontend/frontend');
 * frontendServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = (args = {}) => {
    const settings = __deepMerge(__sugarConfig('frontend'), args);
    const server = __express();
    const promise = new __SPromise({
        id: 'frontendServer'
    });
    // static directories
    Object.keys(settings.staticDirs).forEach((path) => {
        const fsPath = settings.staticDirs[path];
        server.use(path, __express.static(fsPath));
    });
    // load the middlewares
    const middlewaresObj = settings.middlewares || {};
    for (let [key, middleware] of Object.entries(middlewaresObj)) {
        if (middleware.path.slice(-3) !== '.js')
            middleware.path += '.js';
        middleware.path = __path.resolve(middleware.path);
        if (!__fs.existsSync(middleware.path)) {
            return promise.reject(`The express middleware "<yellow>${key}</yellow>" targeted at "<cyan>${middleware.path}</cyan>" does not exists...`);
        }
        // register the middleware
        server.use(require(middleware.path)(middleware.settings || {}));
    }
    // loop on handlers
    Object.keys(settings.handlers).forEach(async (pageName) => {
        const handlerSettings = __deepMerge({
            log: true
        }, settings.handlers[pageName]);
        let handlerPath = handlerSettings.handler;
        if (handlerPath.slice(-3) !== '.js')
            handlerPath += '.js';
        if (!__fs.existsSync(handlerPath)) {
            console.warn(`Frontend handler "<cyan>${__path.relative(__packageRoot(), handlerPath)}</cyan>" does not exists...`);
        }
        else {
            const handlerFn = require(handlerPath);
            let method = handlerSettings.method || 'get', slug = handlerSettings.slug || '*', extension = handlerSettings.extension
                ? Array.isArray(handlerSettings.extension)
                    ? Array.isArray(handlerSettings.extension)
                    : [handlerSettings.extension]
                : null;
            if (slug !== '*') {
                slug = [`${slug}/*`, `${slug}`];
            }
            server[method](slug, async (req, res, next) => {
                const reqPathExtension = __extension(req.path);
                if (extension) {
                    if (extension.indexOf(reqPathExtension) === -1 &&
                        extension.indexOf('.' + reqPathExtension) === -1) {
                        return next();
                    }
                }
                handlerFn(req, res, handlerSettings);
            });
        }
    });
    server
        .listen(settings.port, settings.hostname, () => {
        setTimeout(() => {
            promise.trigger('log', {
                type: 'header',
                value: __trimLines(`Your <primary>Frontend Express</primary> server is <green>up and running</green>:

              - Hostname        : <yellow>${settings.hostname}</yellow>
              - Port            : <yellow>${settings.port}</yellow>
              - Root directory  : <yellow>${settings.rootDir}</yellow>
              - URL             : <cyan>http://${settings.hostname}:${settings.port}</cyan>`)
            });
        }, 200);
    })
        .on('error', (e) => {
        const string = e.toString();
        promise.reject(string);
    });
    return promise;
};
