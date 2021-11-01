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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function view(req, res, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aWV3SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBR2QsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFNNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQWdCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFOzs7UUFDdEQsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBRSxRQUFRLEdBQUcsTUFBQSxRQUFRLENBQUMsU0FBUyxtQ0FBSSxPQUFPLENBQUM7O1lBQ3hELFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkQsTUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxtQkFDakMsQ0FBQyxNQUFBLEdBQUcsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FBQyxFQUM3QixDQUFDO1FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOztDQUMxQiJ9