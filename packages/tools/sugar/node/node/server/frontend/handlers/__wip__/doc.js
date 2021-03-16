"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __packageRoot = require('../../../path/packageRoot');
const __SPromise = require('../../../promise/SPromise');
const __toHtml = require('../../../convert/toHtml');
const __SDocMap = require('../../../doc/SDocMap');
const __SDocblock = require('../../../docblock/SDocblock');
const __SDocblockHtmlOutput = require('../../../docblock/outputs/SDocblockHtmlOutput');
const __render = require('../../../template/render');
/**
 * @name                styleguide
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the "styleguide" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function doc(req, res, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let params = req.params[0].split('/');
        let namespace = params[0];
        const docMap = yield __SDocMap.read();
        // check if we have the requested doc
        if (!docMap[namespace]) {
            const resultObj = __render('pages.404', {
                title: `Doc "${namespace}" not found`,
                error: `The documentation namespaced "${namespace}" does not exists...`
            });
            res.status(404);
            res.type('text/html');
            return res.send(resultObj.content);
        }
        const docMapItem = docMap[namespace];
        // read file with docblock parser
        const docblock = new __SDocblock(docMapItem.path);
        const docblockObj = docblock.toObject();
        const dockblockHtmlOutput = new __SDocblockHtmlOutput(docblock);
        // render the view
        const resultObj = yield __render('pages.doc', {
            title: docblockObj.name,
            body: yield dockblockHtmlOutput.render()
        });
        res.status(resultObj.status);
        res.type('text/html');
        res.send(resultObj.content);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvc2VydmVyL2Zyb250ZW5kL2hhbmRsZXJzL19fd2lwX18vZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDM0QsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDeEQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDcEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDbEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDM0QsTUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUMsK0NBQStDLENBQUMsQ0FBQztBQUN2RixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFlLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFOztRQUN6RCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdEMscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRTtnQkFDdEMsS0FBSyxFQUFFLFFBQVEsU0FBUyxhQUFhO2dCQUNyQyxLQUFLLEVBQUUsaUNBQWlDLFNBQVMsc0JBQXNCO2FBQ3hFLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXJDLGlDQUFpQztRQUNqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXhDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoRSxrQkFBa0I7UUFDbEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQzVDLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSTtZQUN2QixJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7U0FDekMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQUEsQ0FBQyJ9