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
 * @status              wip
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
    return new Promise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7O0FBRWQsa0VBQWtEO0FBR2xELG9FQUE4QztBQUc5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU07SUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDL0MsSUFBSSxLQUFLLEdBQUcsNkJBQTZCLENBQUM7UUFFMUMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsRSxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUUzRSxNQUFNLFdBQVcsR0FBRyxlQUFhLENBQy9CLHlDQUF5QyxDQUMxQyxDQUFDO1FBRUYsaURBQWlEO1FBQ2pELElBQUksUUFBUSxHQUFHLGdCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTztnQkFBRSxPQUFPLElBQUksQ0FBQztZQUMxRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBRUgsaURBQWlEO1FBQ2pELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFLLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUN4QixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEUsWUFBWSxHQUFHLENBQUMsR0FBRyxZQUFZLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztTQUM5QztRQUVELHdDQUF3QztRQUN4QyxZQUFZLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLE9BQU8sQ0FBQztZQUNOLElBQUksRUFBRSxtQkFBbUI7WUFDekIsS0FBSztZQUNMLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLElBQUksRUFBRSxrQkFBa0I7U0FDekIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxpQkFBUyxNQUFNLENBQUMifQ==