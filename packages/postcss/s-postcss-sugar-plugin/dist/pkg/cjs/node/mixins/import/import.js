"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const fs_1 = require("@coffeekraken/sugar/fs");
const chokidar_1 = __importDefault(require("chokidar"));
const path_1 = __importDefault(require("path"));
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
class postcssSugarPluginImportInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginImportInterface;
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
function default_1({ params, atRule, postcss, registerPostProcessor, settings, }) {
    const finalParams = Object.assign({}, params);
    if (!finalParams.path.match(/\.css$/)) {
        return;
    }
    const dirName = typeof atRule.source.input.file === 'string'
        ? path_1.default.dirname(atRule.source.input.file)
        : (0, fs_1.__dirname)();
    // resolve globs even if it's a simple path
    const files = s_glob_1.default.resolve(finalParams.path, {
        cwd: dirName,
    });
    // watch for new / deleted files
    if (!_watcher) {
        function triggerUpdate(path) {
            s_event_emitter_1.default.global.emit('s-postcss-sugar-plugin-import-update', {
                path: path_1.default.resolve(dirName, path),
            });
        }
        const watcher = chokidar_1.default.watch(finalParams.path, {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUM1RCxrRUFBMkM7QUFDM0MsNEVBQXFEO0FBQ3JELCtDQUFtRDtBQUNuRCx3REFBa0M7QUFDbEMsZ0RBQTBCO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxpQ0FBa0MsU0FBUSxxQkFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU82QyxzREFBUztBQUV2RDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxJQUFJLFFBQVEsQ0FBQztBQUNiLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxxQkFBcUIsRUFDckIsUUFBUSxHQU9YO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ25DLE9BQU87S0FDVjtJQUVELE1BQU0sT0FBTyxHQUNULE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7UUFDeEMsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxJQUFBLGNBQVMsR0FBRSxDQUFDO0lBRXRCLDJDQUEyQztJQUMzQyxNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQzVDLEdBQUcsRUFBRSxPQUFPO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsZ0NBQWdDO0lBQ2hDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDWCxTQUFTLGFBQWEsQ0FBQyxJQUFJO1lBQ3ZCLHlCQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdkIsc0NBQXNDLEVBQ3RDO2dCQUNJLElBQUksRUFBRSxjQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7YUFDdEMsQ0FDSixDQUFDO1FBQ04sQ0FBQztRQUNELE1BQU0sT0FBTyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDL0MsR0FBRyxFQUFFLE9BQU87WUFDWixhQUFhLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFCLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxQixhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNuQixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUM1QixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBbEVELDRCQWtFQyJ9