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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugar_1 = __importDefault(require("../../../config/sugar"));
const filter_1 = __importDefault(require("../../../object/filter"));
/**
 * @name                search
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @wip
 *
 * This function is responsible of responding to express requests made on the "search" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function search(req, server) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let title = `Search results | 18 results`;
        let keyword = req.params[0] ? req.params[0].split(' ')[0] : 'doc';
        let searchString = req.params[0] ? req.params[0].replace(keyword, '') : '';
        const searchRules = sugar_1.default('frontend.handlers.search.settings.rules');
        // preparing the handlers to use for the research
        let handlers = filter_1.default(searchRules, (rule) => {
            if (rule.keyword && rule.keyword === keyword)
                return true;
            return false;
        });
        // loop on each handlers to proceed to the search
        let resultsArray = [];
        for (let key in handlers) {
            const handler = handlers[key];
            const results = yield handler.handler(searchString, handler.settings);
            resultsArray = [...resultsArray, ...results];
        }
        // pass all the results info JSON format
        resultsArray = resultsArray.map((item) => {
            return item.toJson();
        });
        // send back the result
        resolve({
            view: 'components.search',
            title,
            content: resultsArray,
            type: 'application/json'
        });
    }));
}
module.exports = search;
