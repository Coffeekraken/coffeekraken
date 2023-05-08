// @ts-nocheck

/**
 * @name                index
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function is responsible of responding to express requests made on the index pages
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function doc(req, res, settings = {}) {
    return new Promise(async (resolve) => {
        // render the proper template
        const pageHtml = await res.viewRenderer.render(
            {
                body: 'Hello world',
            },
            {
                dataFile: true,
            },
        );

        res.type('text/html');
        res.status(200);
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    });
}
