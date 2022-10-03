var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __unique } from '@coffeekraken/sugar/array';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import { __dirname, __pickOne, __readJsonSync, __writeFileSync, } from '@coffeekraken/sugar/fs';
/**
 * @name        postcssIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "manifest.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const postcssIngredient = {
    id: 'postcss',
    description: 'Add support for <yellow>postcss</yellow> and the <yellow>@coffeekraken/s-postcss-sugar-plugin</yellow> into your project',
    projectTypes: ['unknown', 'sugar', 'next'],
    add({ ask, log, emit, pipe, context }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = __packageRootDir();
            const sKitchenPackageRoot = __packageRootDir(__dirname());
            const sKitchenPackageJson = __readJsonSync(`${sKitchenPackageRoot}/package.json`);
            let currentConfig = {
                plugins: [],
            };
            let configFile = __pickOne([
                '.postcssrc.json',
                '.postcssrc.js',
                'postcss.config.json',
                'postcss.config.js',
            ], {
                cwd: packageRoot,
            });
            let configFilePath = (_a = configFile === null || configFile === void 0 ? void 0 : configFile.path) !== null && _a !== void 0 ? _a : `${packageRoot}/${(_b = configFile === null || configFile === void 0 ? void 0 : configFile.name) !== null && _b !== void 0 ? _b : 'postcss.config.json'}`;
            // create file if needed
            if (!configFile) {
                __fs.writeFileSync(configFilePath, JSON.stringify({}));
            }
            switch (configFile === null || configFile === void 0 ? void 0 : configFile.extension) {
                case 'json':
                    currentConfig = __readJsonSync(configFile.path);
                    break;
                case 'js':
                    // import the config
                    currentConfig = (yield import(configFile.path)).default;
                    break;
            }
            // ask to override if needed
            if (configFile) {
                const res = yield emit('ask', {
                    type: 'confirm',
                    message: `Do you want to override the current config file with these new config ?\n\n${JSON.stringify(currentConfig, null, 2)}`,
                    default: true,
                });
                if (!res)
                    return false;
            }
            // installing the actual plugin
            emit('log', {
                value: `<yellow>[postcss]</yellow> Installing the actual <cyan>@coffeekraken/s-postcss-sugar-plugin</cyan> and other useful ones...`,
            });
            const plugins = [
                '@coffeekraken/s-postcss-sugar-plugin',
                'postcss-import',
                'postcss-nested',
                'postcss-atroot',
                'postcss-extend-rule',
                'postcss-property-lookup',
                'autoprefixer',
            ];
            // install dependencies
            yield __npmInstall(['postcss', ...plugins]);
            // saving new config
            emit('log', {
                value: `<yellow>[postcss]</yellow> Saving new configuration file under <cyan>${configFilePath}</cyan>.`,
            });
            // add plugins in config
            if (Array.isArray(currentConfig.plugins)) {
                currentConfig.plugins = __unique([...currentConfig.plugins, ,]);
            }
            else {
                plugins.forEach((plugin) => {
                    if (currentConfig.plugins[plugin]) {
                        return;
                    }
                    currentConfig.plugins[plugin] = {};
                });
            }
            let jsonStr;
            switch (configFile === null || configFile === void 0 ? void 0 : configFile.extension) {
                case 'js':
                    jsonStr = JSON.stringify(currentConfig, null, 4);
                    __fs.writeFileSync(configFilePath, `module.exports = ${jsonStr};`);
                    break;
                case 'json':
                default:
                    jsonStr = JSON.stringify(currentConfig, null, 4);
                    __fs.writeFileSync(configFilePath, jsonStr);
                    break;
            }
            const thisPackageRoot = __packageRootDir(__dirname());
            const globalCssToAdd = __fs
                .readFileSync(`${thisPackageRoot}/src/data/postcss/index.css`)
                .toString();
            const sugarCss = __fs
                .readFileSync(`${thisPackageRoot}/src/data/postcss/sugar.css`)
                .toString();
            let globalCss;
            // detecting the package type (next, generic, etc...)
            switch (context.projectType.type) {
                case 'next':
                    emit('log', {
                        value: '<yellow>[postcss]</yellow> <cyan>Nextjs</cyan> project detected. Adding sugar css files...',
                    });
                    globalCss = __fs
                        .readFileSync(`${packageRoot}/styles/globals.css`)
                        .toString();
                    if (!globalCss.includes(globalCssToAdd)) {
                        __fs.writeFileSync(`${packageRoot}/styles/globals.css`, [globalCssToAdd, globalCss].join('\n\n'));
                    }
                    if (!__fs.existsSync(`${packageRoot}/styles/sugar.css`)) {
                        __fs.writeFileSync(`${packageRoot}/styles/sugar.css`, sugarCss);
                    }
                    break;
                default:
                    emit('log', {
                        value: '<yellow>[postcss]</yellow> <cyan>Generic</cyan> project detected. Adding sugar css files...',
                    });
                    const srcCssDir = __SSugarConfig.get('storage.src.cssDir');
                    if (!__fs.existsSync(`${srcCssDir}/index.css`)) {
                        __writeFileSync(`${srcCssDir}/index.css`, '');
                    }
                    globalCss = __fs
                        .readFileSync(`${srcCssDir}/index.css`)
                        .toString();
                    if (!globalCss.includes(globalCssToAdd)) {
                        __fs.writeFileSync(`${srcCssDir}/index.css`, [globalCssToAdd, globalCss].join('\n\n'));
                    }
                    if (!__fs.existsSync(`${srcCssDir}/sugar.css`)) {
                        __fs.writeFileSync(`${srcCssDir}/sugar.css`, sugarCss);
                    }
                    break;
            }
            emit('log', {
                value: `<yellow>[postcss]</yellow> Added <green>successfully</green> in your project. Have fun!`,
            });
            return true;
        });
    },
};
export default postcssIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFlBQVksTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFHdEIsT0FBTyxFQUNILFNBQVMsRUFDVCxTQUFTLEVBQ1QsY0FBYyxFQUNkLGVBQWUsR0FDbEIsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBd0I7SUFDM0MsRUFBRSxFQUFFLFNBQVM7SUFDYixXQUFXLEVBQ1AsMEhBQTBIO0lBQzlILFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7OztZQUN2QyxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1lBRXZDLE1BQU0sbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUMxRCxNQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FDdEMsR0FBRyxtQkFBbUIsZUFBZSxDQUN4QyxDQUFDO1lBRUYsSUFBSSxhQUFhLEdBQUc7Z0JBQ2hCLE9BQU8sRUFBRSxFQUFFO2FBQ2QsQ0FBQztZQUVGLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FDdEI7Z0JBQ0ksaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLHFCQUFxQjtnQkFDckIsbUJBQW1CO2FBQ3RCLEVBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLFdBQVc7YUFDbkIsQ0FDSixDQUFDO1lBRUYsSUFBSSxjQUFjLEdBQ2QsTUFBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxtQ0FDaEIsR0FBRyxXQUFXLElBQUksTUFBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxtQ0FBSSxxQkFBcUIsRUFBRSxDQUFDO1lBRWxFLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMxRDtZQUVELFFBQVEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLFNBQVMsRUFBRTtnQkFDM0IsS0FBSyxNQUFNO29CQUNQLGFBQWEsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoRCxNQUFNO2dCQUNWLEtBQUssSUFBSTtvQkFDTCxvQkFBb0I7b0JBQ3BCLGFBQWEsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDeEQsTUFBTTthQUNiO1lBRUQsNEJBQTRCO1lBQzVCLElBQUksVUFBVSxFQUFFO2dCQUNaLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDMUIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLDhFQUE4RSxJQUFJLENBQUMsU0FBUyxDQUNqRyxhQUFhLEVBQ2IsSUFBSSxFQUNKLENBQUMsQ0FDSixFQUFFO29CQUNILE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEdBQUc7b0JBQUUsT0FBTyxLQUFLLENBQUM7YUFDMUI7WUFFRCwrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsNkhBQTZIO2FBQ3ZJLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHO2dCQUNaLHNDQUFzQztnQkFDdEMsZ0JBQWdCO2dCQUNoQixnQkFBZ0I7Z0JBQ2hCLGdCQUFnQjtnQkFDaEIscUJBQXFCO2dCQUNyQix5QkFBeUI7Z0JBQ3pCLGNBQWM7YUFDakIsQ0FBQztZQUVGLHVCQUF1QjtZQUN2QixNQUFNLFlBQVksQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFNUMsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHdFQUF3RSxjQUFjLFVBQVU7YUFDMUcsQ0FBQyxDQUFDO1lBRUgsd0JBQXdCO1lBQ3hCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3RDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLEFBQUQsRUFBRyxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN2QixJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQy9CLE9BQU87cUJBQ1Y7b0JBQ0QsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLE9BQU8sQ0FBQztZQUNaLFFBQVEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLFNBQVMsRUFBRTtnQkFDM0IsS0FBSyxJQUFJO29CQUNMLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxhQUFhLENBQ2QsY0FBYyxFQUNkLG9CQUFvQixPQUFPLEdBQUcsQ0FDakMsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssTUFBTSxDQUFDO2dCQUNaO29CQUNJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM1QyxNQUFNO2FBQ2I7WUFDRCxNQUFNLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sY0FBYyxHQUFHLElBQUk7aUJBQ3RCLFlBQVksQ0FBQyxHQUFHLGVBQWUsNkJBQTZCLENBQUM7aUJBQzdELFFBQVEsRUFBRSxDQUFDO1lBRWhCLE1BQU0sUUFBUSxHQUFHLElBQUk7aUJBQ2hCLFlBQVksQ0FBQyxHQUFHLGVBQWUsNkJBQTZCLENBQUM7aUJBQzdELFFBQVEsRUFBRSxDQUFDO1lBRWhCLElBQUksU0FBUyxDQUFDO1lBRWQscURBQXFEO1lBQ3JELFFBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzlCLEtBQUssTUFBTTtvQkFDUCxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLEtBQUssRUFBRSw0RkFBNEY7cUJBQ3RHLENBQUMsQ0FBQztvQkFFSCxTQUFTLEdBQUcsSUFBSTt5QkFDWCxZQUFZLENBQUMsR0FBRyxXQUFXLHFCQUFxQixDQUFDO3lCQUNqRCxRQUFRLEVBQUUsQ0FBQztvQkFFaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7d0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQ2QsR0FBRyxXQUFXLHFCQUFxQixFQUNuQyxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQzNDLENBQUM7cUJBQ0w7b0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLG1CQUFtQixDQUFDLEVBQUU7d0JBQ3JELElBQUksQ0FBQyxhQUFhLENBQ2QsR0FBRyxXQUFXLG1CQUFtQixFQUNqQyxRQUFRLENBQ1gsQ0FBQztxQkFDTDtvQkFDRCxNQUFNO2dCQUNWO29CQUNJLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLDZGQUE2RjtxQkFDdkcsQ0FBQyxDQUFDO29CQUVILE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFFM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLFlBQVksQ0FBQyxFQUFFO3dCQUM1QyxlQUFlLENBQUMsR0FBRyxTQUFTLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDakQ7b0JBRUQsU0FBUyxHQUFHLElBQUk7eUJBQ1gsWUFBWSxDQUFDLEdBQUcsU0FBUyxZQUFZLENBQUM7eUJBQ3RDLFFBQVEsRUFBRSxDQUFDO29CQUVoQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTt3QkFDckMsSUFBSSxDQUFDLGFBQWEsQ0FDZCxHQUFHLFNBQVMsWUFBWSxFQUN4QixDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQzNDLENBQUM7cUJBQ0w7b0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLFlBQVksQ0FBQyxFQUFFO3dCQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsU0FBUyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQzFEO29CQUNELE1BQU07YUFDYjtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHlGQUF5RjthQUNuRyxDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQzs7S0FDZjtDQUNKLENBQUM7QUFDRixlQUFlLGlCQUFpQixDQUFDIn0=