import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SGlob from '@coffeekraken/s-glob';
import __SInterface from '@coffeekraken/s-interface';
import { __dirname } from '@coffeekraken/sugar/fs';
import __chokidar from 'chokidar';
import __path from 'path';
/**
 * @name           import
 * @namespace      node.mixin.import
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to import other files just like the @import statement does.
 * It add the feature to specify a glob pattern to import multiple files at once.
 *
 * @param         {String}        path        The file path you want to import relative to the file you're in
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.import('./my-cool-file.css');
 * \@sugar.import('../views/** /*.css');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginImportInterface extends __SInterface {
    static get _definition() {
        return {
            path: {
                type: 'String',
                required: true,
            },
            media: {
                type: 'String',
            },
        };
    }
}
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
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _watcher;
export default function ({ params, atRule, postcss, registerPostProcessor, settings, }) {
    const finalParams = Object.assign({}, params);
    if (!finalParams.path.match(/\.css$/)) {
        return;
    }
    const dirName = typeof atRule.source.input.file === 'string'
        ? __path.dirname(atRule.source.input.file)
        : __dirname();
    // resolve globs even if it's a simple path
    const files = __SGlob.resolve(finalParams.path, {
        cwd: dirName,
    });
    // watch for new / deleted files
    if (!_watcher) {
        function triggerUpdate(path) {
            __SEventEmitter.global.emit('s-postcss-sugar-plugin-import-update', {
                path: __path.resolve(dirName, path),
            });
        }
        const watcher = __chokidar.watch(finalParams.path, {
            cwd: dirName,
            ignoreInitial: true,
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
    files.forEach((file) => {
        let newRule = postcss.parse(`@import "${file.relPath}";`);
        if (settings.target === 'vite') {
            newRule = postcss.parse(`@import url("${file.relPath}");`);
        }
        newRule.source.input.file = atRule.source.input.file;
        atRule.parent.insertBefore(atRule, newRule);
    });
    atRule.remove();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZO0lBQ3hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILElBQUksUUFBUSxDQUFDO0FBQ2IsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxxQkFBcUIsRUFDckIsUUFBUSxHQU9YO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ25DLE9BQU87S0FDVjtJQUVELE1BQU0sT0FBTyxHQUNULE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7UUFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV0QiwyQ0FBMkM7SUFDM0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQzVDLEdBQUcsRUFBRSxPQUFPO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsZ0NBQWdDO0lBQ2hDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDWCxTQUFTLGFBQWEsQ0FBQyxJQUFJO1lBQ3ZCLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN2QixzQ0FBc0MsRUFDdEM7Z0JBQ0ksSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzthQUN0QyxDQUNKLENBQUM7UUFDTixDQUFDO1FBQ0QsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQy9DLEdBQUcsRUFBRSxPQUFPO1lBQ1osYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxQixhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZCLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQzFELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7WUFDNUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEIsQ0FBQyJ9