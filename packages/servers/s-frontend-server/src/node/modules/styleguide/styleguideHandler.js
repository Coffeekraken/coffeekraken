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
import __SDocblock from '@coffeekraken/s-docblock';
import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { page404 } from '@coffeekraken/s-view-renderer';
/**
 * @name                styleguideHandler
 * @namespace           sugar.node.server.frontend.modules.styleguide
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
export default function styleguide(req, res, settings = {}) {
    return new __SPromise(({ resolve, reject, pipe, pipeError }) => __awaiter(this, void 0, void 0, function* () {
        const docmap = new __SDocMap();
        const docmapJson = yield docmap.read();
        const styleguideMenu = docmapJson.menu.custom.styleguide;
        const styleguideObj = styleguideMenu.slug[req.path];
        if (!styleguideObj || !__fs.existsSync(styleguideObj.docmap.path)) {
            const error = yield page404(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Styleguide "${req.path}" not found`, body: `The styleguide "${req.path}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        const finalReqPath = `/styleguide/${req.path.split('/styleguide/')[1]}`;
        const docblocksInstance = new __SDocblock(styleguideObj.docmap.path, {
            docblock: {
                renderMarkdown: true,
                filterByTag: {
                    menu: (value) => {
                        if (!value || typeof value !== 'string')
                            return false;
                        const parts = value.split(/\s{2,99999999}/);
                        if (parts.length >= 2 && parts[1] === finalReqPath)
                            return true;
                        return false;
                    },
                },
            },
        });
        yield docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();
        const docView = new __SViewRenderer('pages.styleguide.styleguide');
        const pageHtml = yield docView.render(Object.assign(Object.assign({}, (res.templateData || {})), { docblocks }));
        res.status(200);
        res.type('text/html');
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVndWlkZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHlsZWd1aWRlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBR2QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUd4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN0RCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO1FBQ2pFLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBRXpELE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLGlDQUNwQixDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLEtBQUssRUFBRSxlQUFlLEdBQUcsQ0FBQyxJQUFJLGFBQWEsRUFDM0MsSUFBSSxFQUFFLG1CQUFtQixHQUFHLENBQUMsSUFBSSxvQ0FBb0MsSUFDdkUsQ0FBQztZQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFFRCxNQUFNLFlBQVksR0FBRyxlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFeEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNqRSxRQUFRLEVBQUU7Z0JBQ04sY0FBYyxFQUFFLElBQUk7Z0JBQ3BCLFdBQVcsRUFBRTtvQkFDVCxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDWixJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7NEJBQUUsT0FBTyxLQUFLLENBQUM7d0JBQ3RELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDNUMsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWTs0QkFDOUMsT0FBTyxJQUFJLENBQUM7d0JBQ2hCLE9BQU8sS0FBSyxDQUFDO29CQUNqQixDQUFDO2lCQUNKO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRS9DLE1BQU0sT0FBTyxHQUFHLElBQUksZUFBZSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFFbkUsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsTUFBTSxpQ0FDOUIsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixTQUFTLElBQ1gsQ0FBQztRQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=