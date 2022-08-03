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
import __SViewRenderer from '@coffeekraken/s-view-renderer';
/**
 * @name                views
 * @namespace           node.modules.view
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the "views" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function view({ req, res }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let viewPath;
        if (!req.params[0])
            viewPath = (_a = settings.indexView) !== null && _a !== void 0 ? _a : 'index';
        else
            viewPath = req.params[0].split('/').join('.');
        const viewInstance = new __SViewRenderer(viewPath);
        const result = yield viewInstance.render(Object.assign({}, ((_b = res.templateData) !== null && _b !== void 0 ? _b : {})));
        res.status(200);
        res.type('text/html');
        res.send(result.value);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQU01RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7O1FBQzNDLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUUsUUFBUSxHQUFHLE1BQUEsUUFBUSxDQUFDLFNBQVMsbUNBQUksT0FBTyxDQUFDOztZQUN4RCxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE1BQU0sbUJBQ2pDLENBQUMsTUFBQSxHQUFHLENBQUMsWUFBWSxtQ0FBSSxFQUFFLENBQUMsRUFDN0IsQ0FBQztRQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Q0FDMUIifQ==