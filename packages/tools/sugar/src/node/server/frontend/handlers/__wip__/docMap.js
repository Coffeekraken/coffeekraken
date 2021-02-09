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
const SDocMap_1 = __importDefault(require("../../../doc/SDocMap"));
/**
 * @name                docMap
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the docMap url
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
function docMap(req, res, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = new SPromise_1.default();
        (() => __awaiter(this, void 0, void 0, function* () {
            const docMap = new SDocMap_1.default();
            const docMapPromise = docMap.read();
            SPromise_1.default.pipe(docMapPromise, promise);
            docMapPromise.on('reject', (e) => {
                res.status(500);
                res.type('text/html');
                res.send(e);
                promise.reject(e);
            });
            const docMapJson = yield docMapPromise;
            res.status(200);
            res.type('application/json');
            res.send(docMapJson);
            promise.resolve(docMapJson);
        }))();
        return promise;
    });
}
exports.default = docMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHlFQUFtRDtBQUNuRCxtRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQThCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFOztRQUMxRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFVLEVBQUUsQ0FBQztRQUVqQyxDQUFDLEdBQVMsRUFBRTtZQUNWLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO1lBQy9CLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQyxrQkFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxVQUFVLEdBQUcsTUFBTSxhQUFhLENBQUM7WUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztRQUVMLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FBQTtBQXJCRCx5QkFxQkMifQ==