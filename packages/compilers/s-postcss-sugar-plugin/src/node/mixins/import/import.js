import __SInterface from '@coffeekraken/s-interface';
import __SGlob from '@coffeekraken/s-glob';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __chokidar from 'chokidar';
import __globalEventEmitter from '@coffeekraken/sugar/node/event/globalEventEmitter';
/**
 * @name           import
 * @namespace      node.mixins.import
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to import other files just like the @import statement does.
 * It add the feature to specify a glob pattern to import multiple files at once.
 *
 * @param         {String}        path        The file path you want to import relative to the file you're in
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.import('./my-cool-file.css');
 * \@sugar.import('../views/** /*.css');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginImportInterface extends __SInterface {
}
postcssSugarPluginImportInterface.definition = {
    path: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginImportInterface as interface };
/**
 * @name          import
 * @namespace     sugar.postcss.mixin.import
 * @type          PostcssMixin
 *
 * This mixin allows you to import files as default import statement does but add the glob support like "something/* * /*.css"
 *
 * @param       {String}        path      The path or glob to import
 * @return      {Css}                   The corresponding imported css
 *
 * @example       css
 * \@sugar.import('./** /*.css');
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _watcher;
export default function ({ params, atRule, postcss }) {
    const finalParams = Object.assign({}, params);
    const dirName = typeof atRule.source.input.file === 'string'
        ? __path.dirname(atRule.source.input.file)
        : __dirname();
    // resolve globs even if it's a simple path
    const files = __SGlob.resolve(finalParams.path, {
        cwd: dirName
    });
    // watch for new / deleted files
    if (!_watcher) {
        function triggerUpdate(path) {
            __globalEventEmitter.emit('s-postcss-sugar-plugin-import-update', {
                path: __path.resolve(dirName, path)
            });
        }
        const watcher = __chokidar.watch(finalParams.path, {
            cwd: dirName,
            ignoreInitial: true
        });
        watcher.on('change', (path) => {
            triggerUpdate(path);
        });
        watcher.on('add', (path) => {
            triggerUpdate(path);
        });
        watcher.on('unlink', (path) => {
            triggerUpdate(path);
        });
    }
    files.forEach(file => {
        const newRule = postcss.parse(`@import url('${file.relPath}');`);
        newRule.source.input.file = atRule.source.input.file;
        atRule.parent.insertAfter(atRule, newRule);
    });
    atRule.remove();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1wb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxvQkFBb0IsTUFBTSxtREFBbUQsQ0FBQztBQUVyRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0saUNBQWtDLFNBQVEsWUFBWTs7QUFDbkQsNENBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBT0osT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILElBQUksUUFBUSxDQUFDO0FBQ2IsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFLUjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUNYLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7UUFDMUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVsQiwyQ0FBMkM7SUFDM0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQzlDLEdBQUcsRUFBRSxPQUFPO0tBQ2IsQ0FBQyxDQUFDO0lBRUgsZ0NBQWdDO0lBQ2hDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixTQUFTLGFBQWEsQ0FBQyxJQUFJO1lBQ3pCLG9CQUFvQixDQUFDLElBQUksQ0FBQyxzQ0FBc0MsRUFBRTtnQkFDaEUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzthQUNwQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ2pELEdBQUcsRUFBRSxPQUFPO1lBQ1osYUFBYSxFQUFFLElBQUk7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QixhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ25CLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2xCLENBQUMifQ==