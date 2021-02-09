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
Object.defineProperty(exports, "__esModule", { value: true });
const SPromise_1 = __importDefault(require("../../../promise/SPromise"));
const SDocMap_1 = __importDefault(require("../../../docMap/SDocMap"));
const _404_1 = __importDefault(require("../../../template/pages/404"));
const SDocblock_1 = __importDefault(require("../../../docblock/SDocblock"));
const SDocblockHtmlRenderer_1 = __importDefault(require("../../../docblock/renderers/SDocblockHtmlRenderer"));
/**
 * @name                doc
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the doc pages
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function doc(req, res, settings = {}) {
    return new SPromise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const docMap = new SDocMap_1.default();
        const namespace = req.path.replace('/doc/', '').trim();
        const docMapJson = yield docMap.read();
        if (!docMapJson[namespace]) {
            const html = yield _404_1.default({
                title: `Documentation "${namespace}" not found`,
                body: `The documentation "${namespace}" you requested does not exists...`
            });
            res.type('text/html');
            res.status(404);
            res.send(html);
            return reject(html);
        }
        // generate the docblocks
        const docblock = new SDocblock_1.default(docMapJson[namespace].path);
        // render them into html
        const htmlRenderer = new SDocblockHtmlRenderer_1.default(docblock);
        const html = yield htmlRenderer.render();
        // nativeConsole.log(req);
        res.type('text/html');
        res.status(200);
        res.send(html);
        resolve(html);
    }));
}
exports.default = doc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHlFQUFtRDtBQUluRCxzRUFBZ0Q7QUFDaEQsdUVBQW9EO0FBQ3BELDRFQUFzRDtBQUN0RCw4R0FBd0Y7QUFFeEY7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQXdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ2pELE9BQU8sSUFBSSxrQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZELE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFTLENBQUM7Z0JBQzNCLEtBQUssRUFBRSxrQkFBa0IsU0FBUyxhQUFhO2dCQUMvQyxJQUFJLEVBQUUsc0JBQXNCLFNBQVMsb0NBQW9DO2FBQzFFLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckI7UUFFRCx5QkFBeUI7UUFDekIsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3RCx3QkFBd0I7UUFDeEIsTUFBTSxZQUFZLEdBQUcsSUFBSSwrQkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxNQUFNLElBQUksR0FBRyxNQUFNLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV6QywwQkFBMEI7UUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUM7QUE3QkQsc0JBNkJDIn0=