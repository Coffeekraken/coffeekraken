var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFile from '@coffeekraken/s-file';
import { __distCssDir, __packageRootDir, __srcCssDir, } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
let _timeoutsByLevel = {};
// const sharedData.lodRulesByLevels = {};
const lodRootsByFile = {};
let currentCssByLevel = {};
export default function ({ root, sharedData, postcssApi, settings, getRoot, }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // check if the lod feature is enabled or not
        if (!((_a = settings.lod) === null || _a === void 0 ? void 0 : _a.enabled)) {
            return;
        }
        function generateLodRuleSelectors(rule, levelStr, settings) {
            const finalSettings = Object.assign({}, (settings !== null && settings !== void 0 ? settings : {}));
            const newSelectors = [];
            rule.selectors.forEach((sel) => {
                // protect some selectors like ":root", etc...
                if (sel.trim().match(/^(\:){1,2}[a-z]+$/)) {
                    newSelectors.push(sel);
                    return;
                }
                // handle already lod scoped rules
                if (sel.startsWith('.s-lod--')) {
                    newSelectors.push(sel);
                    return;
                }
                // handle pseudo classes ":after", etc...
                const pseudoMatch = sel.match(/(\:{1,2})[a-z-]+$/);
                let pseudo = '', theme = '';
                if (pseudoMatch) {
                    pseudo = pseudoMatch[0];
                    sel = sel.replace(pseudo, '');
                }
                // split the selector to construct it
                const selParts = sel.split(' '), newSelParts = [];
                // theme attribute (@sugar.theme.when)
                if (selParts[0].startsWith('[theme')) {
                    theme = selParts[0];
                    selParts.shift();
                }
                // add the first selector part
                newSelParts.push(selParts[0]);
                selParts.shift();
                // middle selector part
                if (selParts.length) {
                    newSelParts.push(` ${selParts.join(' ')}`);
                }
                const finalSelectorStr = newSelParts.join('');
                let finalSelector = [];
                // deep support
                if (levelStr) {
                    if (finalSelectorStr.endsWith('body')) {
                        // apply the lod on the body
                        finalSelector.push(`${finalSelectorStr}.s-lod--${levelStr}`);
                    }
                    else {
                        // scope the element into the lod class
                        finalSelector.push(`.s-lod--${levelStr} ${finalSelectorStr}`);
                    }
                }
                // add theme if needed
                if (theme) {
                    finalSelector = finalSelector.map((s) => {
                        return `${theme} ${s}`;
                    });
                }
                // add pseudo
                if (pseudo) {
                    finalSelector = finalSelector.map((s) => {
                        return `${s}${pseudo}`;
                    });
                }
                for (let s of finalSelector) {
                    if (!newSelectors.includes(s)) {
                        newSelectors.push(s);
                    }
                }
            });
            return newSelectors;
        }
        function processRuleDecl(rule, decl, levelStr) {
            if (!rule._lod) {
                rule._lod = {};
            }
            if (!rule._lod[levelStr]) {
                rule._lod[levelStr] = {
                    properties: [],
                };
            }
            if (!rule._lod[levelStr].properties.includes(decl)) {
                rule._lod[levelStr].properties.push(decl);
            }
            decl.remove();
        }
        const cssPropertiesObj = settings.lod.cssProperties, cssProperties = Object.keys(cssPropertiesObj);
        for (let [levelStr, levelObj] of Object.entries(settings.lod.levels)) {
            // cast level into number
            const level = parseInt(levelStr);
            // the level 0 is the base
            if (level === 0) {
                continue;
            }
            // create the properties regex to walk on
            const propertiesReg = new RegExp(
            // @ts-ignore
            `(${level === 0 ? '?!' : ''}${cssProperties
                .filter((property) => {
                if (level === 0) {
                    return cssPropertiesObj[property] !== 0;
                }
                return cssPropertiesObj[property] === level;
            })
                .map((prop) => {
                return `^${prop}$`;
            })
                .join('|')})`);
            // if nothing to target in the current lod level
            // continue to the next
            if (propertiesReg.toString() === '/()/') {
                continue;
            }
            //
            root.walkDecls(propertiesReg, (decl) => {
                var _a;
                // support for @sugar.lods.prevent mixin
                if (decl.parent._preventLod) {
                    return;
                }
                // do not process decl that does not have a parent with some selectors
                if (!decl.parent.selectors) {
                    return;
                }
                for (let s of decl.parent.selectors) {
                    if ((_a = sharedData._preventLodSelectors) === null || _a === void 0 ? void 0 : _a.includes(s)) {
                        return;
                    }
                }
                processRuleDecl(decl.parent, decl, levelStr);
            });
        }
        const filePath = root.source.input.file;
        // create a stack by level to store each rules
        // by each level
        Object.keys(settings.lod.levels).forEach((level) => {
            if (!sharedData.lodRulesByLevels) {
                sharedData.lodRulesByLevels = {};
            }
            // make sure we have a "root" for the actual level and filePath
            if (!sharedData.lodRulesByLevels[level]) {
                sharedData.lodRulesByLevels[level] = {};
            }
            // reset filePath leveled rules
            sharedData.lodRulesByLevels[level][filePath] = postcssApi.root();
        });
        // handle "file" method
        root.walkRules(/\.s-lod-method--[a-z]+/, (rule) => {
            const method = rule.selector.match(/\.s-lod-method--([a-z]+)/)[1], level = parseInt(rule.selector.match(/\.s-lod--([0-9]{1,2})/)[1]);
            // remove the .s-lod-method--%method... class from the selector
            rule.selector = rule.selector.replace(/\.s-lod-method--[a-z\s]+/gm, '');
            // remove the .s-lod--%level... class from the selector
            rule.selector = rule.selector.replace(/\.s-lod--[0-9\s]{1,2}/gm, '');
            // add the rule in the root
            sharedData.lodRulesByLevels[level][filePath].nodes.push(rule.clone());
            // remove the rule from the actual css
            rule.remove();
        });
        // clean empty rules
        root.walkRules((rule) => {
            // empty rules
            // if (
            //     !rule.nodes?.length ||
            //     !rule.nodes.filter((n) => n.type !== 'comment').length
            // ) {
            //     rule.remove();
            //     return;
            // }
            var _a;
            // support for @sugar.lods.prevent mixin
            // @ts-ignore
            if (rule._preventLod) {
                return;
            }
            // nodes that have no "_lod" properties are nodes
            // that does not have to be treated
            // if (!node._lod || !Object.keys(node._lod).length) {
            //     return;
            // }
            for (let [levelStr, obj] of Object.entries((_a = rule._lod) !== null && _a !== void 0 ? _a : {})) {
                const level = parseInt(levelStr), lodObj = obj;
                if (lodObj.properties.length) {
                    switch (settings.lod.defaultMethod) {
                        case 'class':
                            // @ts-ignore
                            const lodSelectors = generateLodRuleSelectors(rule, levelStr);
                            const newLodRule = postcssApi.rule({
                                selectors: lodSelectors,
                                nodes: lodObj.properties,
                            });
                            // @ts-ignore
                            rule.parent.insertAfter(rule, newLodRule);
                            break;
                        case 'file':
                        default:
                            const newRule = postcssApi.rule({
                                selectors: rule.selectors,
                                nodes: lodObj.properties,
                            });
                            sharedData.lodRulesByLevels[level][filePath].nodes.push(newRule);
                            break;
                    }
                }
            }
            // grab all variables in the node to
            // extract them in the "none-lod" rule
            const vars = [];
            rule.nodes = rule.nodes.filter((n) => {
                if (n.variable) {
                    vars.push(n);
                    return false;
                }
                return true;
            });
            if (vars.length) {
                const varsRule = postcssApi.rule({
                    selectors: rule.selectors,
                    nodes: vars,
                });
                rule.parent.insertBefore(rule, varsRule);
            }
        });
        // write lod files for files names "index.css", "style.css" or "app.css"
        // if (filePath.match(/(index|style|app)\.css$/)) {
        for (let [level, levelObj] of Object.entries(sharedData.lodRulesByLevels)) {
            if (parseInt(level) === 0) {
                continue;
            }
            const outPath = sharedData.rootFilePath
                .replace(/\.css$/, `.lod-${level}.css`)
                .replace(__srcCssDir(), `${__distCssDir()}/lod`), outPathRel = outPath.replace(`${__packageRootDir()}/`, ''), filePath = root.source.input.file, filePathRel = filePath.replace(`${__packageRootDir()}/`, '');
            let finalCss = '';
            for (let [path, lodRoot] of Object.entries(levelObj)) {
                // build final css (minify, etc...)
                finalCss += `\n${lodRoot.toString()}`;
            }
            // clean css
            // @ts-ignore
            const filteredRoot = postcssApi.parse(finalCss);
            filteredRoot.walkRules((r) => {
                var _a;
                if (!((_a = r.nodes) === null || _a === void 0 ? void 0 : _a.length) ||
                    !r.nodes.filter((n) => n.type !== 'comment').length) {
                    r.remove();
                }
            });
            finalCss = filteredRoot.toString().trim();
            // if (settings.target === 'production') {
            //     finalCss = __csso.minify(finalCss, {
            //         restructure: false,
            //         comments: true, // leave all exlamation comments /*! ... */
            //     }).css;
            // }
            // get the current css from the file if exists
            if (!currentCssByLevel[level]) {
                if (__fs.existsSync(outPath)) {
                    currentCssByLevel[level] = __fs
                        .readFileSync(outPath)
                        .toString();
                }
                else {
                    currentCssByLevel[level] = '';
                }
            }
            // replace the current css or add it to the file
            const cssFileMatchReg = new RegExp(`\/\\* S-LOD\:${filePathRel
                .replace(/\//gm, '\\/')
                .replace(/\./, '\\.')} \\*\/[\\w\\W]+\/\\* S-LOD-END\:${filePathRel
                .replace(/\//gm, '\\/')
                .replace(/\./, '\\.')} \\*\/`, 'gm'), cssFileMatch = currentCssByLevel[level].match(cssFileMatchReg);
            // creating the scoped css to put in the file
            const newCss = `
/* S-LOD:${filePathRel} */                
${finalCss}
/* S-LOD-END:${filePathRel} */                
`;
            // add it or replace it
            if (cssFileMatch) {
                currentCssByLevel[level] = currentCssByLevel[level].replace(cssFileMatch[0], finalCss ? newCss : '');
            }
            else if (finalCss) {
                currentCssByLevel[level] += newCss;
            }
            // clearTimeout(_timeoutsByLevel[level]);
            // _timeoutsByLevel[level] = setTimeout(() => {
            // write file on disk
            __writeFileSync(outPath, currentCssByLevel[level]);
            const file = new __SFile(outPath);
            console.log(`<green>[save]</green> Lod (level of details) file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
            // }, 500);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sRUFDSCxZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFdBQVcsR0FDZCxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFZekQsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDMUIsMENBQTBDO0FBQzFDLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUMxQixJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUUzQixNQUFNLENBQUMsT0FBTyxXQUFpQixFQUMzQixJQUFJLEVBQ0osVUFBVSxFQUNWLFVBQVUsRUFDVixRQUFRLEVBQ1IsT0FBTyxHQUNWOzs7UUFDRyw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxPQUFPLENBQUEsRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFDRCxTQUFTLHdCQUF3QixDQUM3QixJQUFTLEVBQ1QsUUFBaUIsRUFDakIsUUFBZ0U7WUFFaEUsTUFBTSxhQUFhLHFCQUNaLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7WUFFRixNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7WUFFbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDM0IsOENBQThDO2dCQUM5QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtvQkFDdkMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFD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