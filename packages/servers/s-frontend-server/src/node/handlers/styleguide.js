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
 * @name                styleguide
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
export default function styleguide(req, res, settings = {}) {
    return new __SPromise(({ resolve, reject, pipe, pipeError }) => __awaiter(this, void 0, void 0, function* () {
        const docmap = new __SDocMap();
        const docmapJson = yield docmap.read();
        const menu = docmapJson.menu;
        const styleguideObj = menu.mixedSlug[req.path];
        if (!styleguideObj || !__fs.existsSync(styleguideObj.docmap.path)) {
            const error = yield page404(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Styleguide "${req.path}" not found`, body: `The styleguide "${req.path}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        const docblocksInstance = new __SDocblock(styleguideObj.docmap.path);
        yield docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();
        // // scrap @see fields opengraph metas
        // await new Promise((resolve, reject) => {
        //     let pendingRequests = 0;
        //     docblocks.forEach((block, i) => {
        //         if (block.see) {
        //             block.see.forEach((seeObj, j) => {
        //                 pendingRequests++;
        //                 __scrapeUrl(seeObj.url)
        //                     .then((results) => {
        //                         seeObj.og = results;
        //                         pendingRequests--;
        //                         if (!pendingRequests) {
        //                             resolve();
        //                         }
        //                     })
        //                     .catch((error) => {
        //                         pendingRequests--;
        //                         if (!pendingRequests) {
        //                             resolve();
        //                         }
        //                     });
        //             });
        //         } else {
        //             if (i === docblocks.length - 1 && !pendingRequests) {
        //                 resolve();
        //             }
        //         }
        //     });
        // });
        const docView = new __SViewRenderer('pages.styleguide.styleguide');
        const pageHtml = yield docView.render(Object.assign(Object.assign({}, (res.templateData || {})), { docblocks }));
        res.status(200);
        res.type('text/html');
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVndWlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxlZ3VpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFHeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdEQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtRQUNqRSxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFFN0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvRCxNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8saUNBQ3BCLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsS0FDM0IsS0FBSyxFQUFFLGVBQWUsR0FBRyxDQUFDLElBQUksYUFBYSxFQUMzQyxJQUFJLEVBQUUsbUJBQW1CLEdBQUcsQ0FBQyxJQUFJLG9DQUFvQyxJQUN2RSxDQUFDO1lBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtRQUNELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRSxNQUFNLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRS9DLHVDQUF1QztRQUN2QywyQ0FBMkM7UUFDM0MsK0JBQStCO1FBRS9CLHdDQUF3QztRQUN4QywyQkFBMkI7UUFDM0IsaURBQWlEO1FBQ2pELHFDQUFxQztRQUVyQywwQ0FBMEM7UUFDMUMsMkNBQTJDO1FBQzNDLCtDQUErQztRQUMvQyw2Q0FBNkM7UUFDN0Msa0RBQWtEO1FBQ2xELHlDQUF5QztRQUN6Qyw0QkFBNEI7UUFDNUIseUJBQXlCO1FBQ3pCLDBDQUEwQztRQUMxQyw2Q0FBNkM7UUFDN0Msa0RBQWtEO1FBQ2xELHlDQUF5QztRQUN6Qyw0QkFBNEI7UUFDNUIsMEJBQTBCO1FBQzFCLGtCQUFrQjtRQUNsQixtQkFBbUI7UUFDbkIsb0VBQW9FO1FBQ3BFLDZCQUE2QjtRQUM3QixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLFVBQVU7UUFDVixNQUFNO1FBRU4sTUFBTSxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUVuRSxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxNQUFNLGlDQUM5QixDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLFNBQVMsSUFDWCxDQUFDO1FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==