"use strict";
const __sugarConfig = require('../../../config/sugar');
const __path = require('path');
const __render = require('../../../template/render');
const __STemplate = require('../../../template/STemplate');
const __fs = require('fs');
const __SDuration = require('../../../time/SDuration');
/**
 * @name                views
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "views" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function views(req, res, settings = {}) {
    let params = req.params[0].split('/');
    const duration = new __SDuration();
    let rootDirs = __STemplate.getRootDirs(settings.rootDir || []);
    for (let i = 0; i < rootDirs.length; i++) {
        const rootDir = rootDirs[i];
        for (let j = 0; j < Object.keys(__STemplate.engines).length; j++) {
            const engineExt = Object.keys(__STemplate.engines)[j];
            const viewPath = __path.resolve(rootDir, params.join('/')) + `.${engineExt}`;
            if (__fs.existsSync(viewPath)) {
                const relativeViewPath = __path.relative(rootDir, viewPath);
                const templateInstance = new __STemplate(relativeViewPath, {
                    rootDirs
                });
                const resultObj = await templateInstance.render({
                    ...(res.templateData || {})
                });
                if (settings.log) {
                    console.log(`<bgGreen><black> views </black></bgGreen> View "<yellow>${req.path}</yellow> served in <cyan>${duration.end()}s</cyan>"`);
                }
                res.status(200);
                res.type('text/html');
                return res.send(resultObj.content);
            }
        }
    }
    // view not found
    const notFoundTemplateInstance = new __STemplate('pages.404', {
        rootDir: rootDirs
    });
    const notFoundObj = await notFoundTemplateInstance.render({
        ...(res.templateData || {}),
        title: `View not found...`,
        error: `The requested view "${req.path}" does not exists in any of these directories:
    <ol>  
    ${notFoundTemplateInstance._settings.rootDir.map((dir) => {
            return `<li>${dir}</li>`;
        })}
    </ol>
    `
    });
    res.status(404);
    res.type('text/html');
    res.send(notFoundObj.content);
};
