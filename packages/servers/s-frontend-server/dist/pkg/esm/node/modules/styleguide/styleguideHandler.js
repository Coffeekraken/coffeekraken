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
import __SLog from '@coffeekraken/s-log';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { page404 } from '@coffeekraken/s-view-renderer';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
import __SBench from '@coffeekraken/s-bench';
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function styleguide({ req, res }) {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        __SBench.start('handlers.styleguide');
        __SBench.step('handlers.styleguide', 'beforeDocmapRead');
        const docmap = new __SDocMap();
        const docmapJson = yield docmap.read();
        const styleguideMenu = docmapJson.menu.custom.styleguide;
        __SBench.step('handlers.styleguide', 'afterDocmapRead');
        const styleguideObj = styleguideMenu.slug[req.path];
        if (!styleguideObj || !__fs.existsSync(styleguideObj.docmap.path)) {
            const error = yield page404(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Styleguide "${req.path}" not found`, body: `The styleguide "${req.path}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        const finalReqPath = `/styleguide/${req.path.split('/styleguide/')[1]}`;
        __SBench.step('handlers.styleguide', 'beforeDocblockParsing');
        const docblocksInstance = new __SDocblock(styleguideObj.docmap.path, {
            docblock: {
                renderMarkdown: false,
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
        if (docblocks.length) {
            if (docblocks[0].see) {
                for (let i = 0; i < docblocks[0].see.length; i++) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`,
                    });
                    docblocks[0].see[i].og = yield __scrapeUrl(docblocks[0].see[i].url);
                }
            }
        }
        __SBench.step('handlers.styleguide', 'afterDocblockParsing');
        __SBench.step('handlers.styleguide', 'beforeViewRendering');
        const docView = new __SViewRenderer('pages.styleguide.styleguide');
        const pageHtml = yield docView.render(Object.assign(Object.assign({}, (res.templateData || {})), { docblocks }));
        __SBench.step('handlers.styleguide', 'afterViewRendering');
        __SBench.end('handlers.styleguide', {}).log();
        res.status(200);
        res.type('text/html');
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7SUFDM0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3RELFFBQVEsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV0QyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFekQsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFFekQsUUFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXhELE1BQU0s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