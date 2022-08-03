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
import { page404 } from '@coffeekraken/s-view-renderer';
import __SBench from '@coffeekraken/s-bench';
/**
 * @name                docmapHandler
 * @namespace           node.modules.docmap
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
export default function docmap({ req, res }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        __SBench.start('handlers.docmap');
        __SBench.step('handlers.docmap', 'beforeDocmapRead');
        const docmap = new __SDocMap();
        const docmapJson = yield docmap.read();
        __SBench.step('handlers.docmap', 'afterDocmapRead');
        if (!docmapJson.map ||
            !__fs.existsSync(docmapJson.map[req.params.namespace].path)) {
            const error = yield page404(Object.assign(Object.assign({}, (res.templateData || {})), { title: `Docmap "${req.params.namespace}" not found`, body: `The docmap "${req.params.namespace}" you requested does not exists...` }));
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        __SBench.step('handlers.docmap', 'beforeMarkdownBuild');
        let html;
        const builder = new __SMarkdownBuilder();
        const markdownRes = yield pipe(builder.build({
            // inRaw: str,
            inPath: docmapJson.map[req.params.namespace].path,
            target: 'html',
            save: false,
        }));
        if (markdownRes instanceof Error) {
            throw markdownRes;
        }
        html = markdownRes[0].code;
        __SBench.step('handlers.docmap', 'afterMarkdownBuild');
        __SBench.step('handlers.docmap', 'beforeViewRendering');
        const viewInstance = new __SViewRenderer('pages.markdown.markdown');
        const viewRes = yield pipe(viewInstance.render(Object.assign(Object.assign({}, ((_a = res.templateData) !== null && _a !== void 0 ? _a : {})), { body: html })));
        res.status(200);
        res.type('text/html');
        res.send(viewRes.value);
        resolve(viewRes.value);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxrQkFBa0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFeEQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtJQUN2QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUM1RCxRQUFRLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXJELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXBELElBQ0ksQ0FBQyxVQUFVLENBQUMsR0FBRztZQUNmLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQzdEO1lBQ0UsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLGlDQUNwQixDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLEtBQUssRUFBRSxXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxhQUFhLEVBQ25ELElBQUksRUFBRSxlQUFlLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxvQ0FBb0MsSUFDL0UsQ0FBQztZQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFeEQsSUFBSSxJQUFJLENBQUM7UUFFVCxNQUFNLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFFekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDVixjQUFjO1lBQ2QsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJO1lBQ2pELE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQ0wsQ0FBQztRQUNGLElBQUksV0FBVyxZQUFZLEtBQUssRUFBRTtZQUM5QixNQUFNLFdBQVcsQ0FBQztTQUNyQjtRQUVELElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUV2RCxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFeEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUVwRSxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FDdEIsWUFBWSxDQUFDLE1BQU0saUNBQ1osQ0FBQyxNQUFBLEdBQUcsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FBQyxLQUMzQixJQUFJLEVBQUUsSUFBSSxJQUNaLENBQ0wsQ0FBQztRQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=