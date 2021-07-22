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
import __SDocMap from '@coffeekraken/s-docmap';
import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
/**
 * @name                markdown
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the doc pages
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function markdown(req, res, settings = {}) {
    return new __SPromise(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const docmap = new __SDocMap();
        const menu = yield docmap.extractMenu();
        let html;
        if (menu.slug[req.url]) {
            const markdownStr = __fs.readFileSync(menu.slug[req.url].docmap.path, 'utf8').toString();
            const builder = new __SMarkdownBuilder();
            const res = yield builder.build({
                input: markdownStr,
                target: 'html'
            });
            html = res.code;
        }
        if (!html) {
            const error = yield page404(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Markdown "${req.url}" not found`, body: `The markdown "${req.url}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        const viewInstance = new __SViewRenderer('pages.markdown.markdown');
        const result = yield viewInstance.render(Object.assign(Object.assign({}, ((_a = res.templateData) !== null && _a !== void 0 ? _a : {})), { body: html }));
        res.status(200);
        res.type('text/html');
        res.send(result.value);
        resolve(result.value);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXJrZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sa0JBQWtCLE1BQU0sa0NBQWtDLENBQUM7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFFdEQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUV4RCxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXhDLElBQUksSUFBSSxDQUFDO1FBRVQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFekYsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBQ3pDLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDOUIsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FHbkI7UUFFRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLGlDQUNwQixDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLEtBQUssRUFBRSxhQUFhLEdBQUcsQ0FBQyxHQUFHLGFBQWEsRUFDeEMsSUFBSSxFQUFFLGlCQUFpQixHQUFHLENBQUMsR0FBRyxvQ0FBb0MsSUFDcEUsQ0FBQztZQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBRXBFLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE1BQU0saUNBQ2pDLENBQUMsTUFBQSxHQUFHLENBQUMsWUFBWSxtQ0FBSSxFQUFFLENBQUMsS0FDM0IsSUFBSSxFQUFFLElBQUksSUFDWixDQUFDO1FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUMifQ==