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
import { __distCssDir, __srcCssDir } from '@coffeekraken/sugar/path';
import * as __csso from 'csso';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
let _timeoutsByLevel = {};
// const sharedData.lodRulesByLevels = {};
const _lodRulesByLevels = {};
export default function ({ root, sharedData, postcssApi, settings, classmap, getRoot, }) {
    var _a, _b;
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
            if (rule.selector.match(/\.s-lod--prevent/)) {
                return;
            }
            // support for @sugar.lod.only mixin
            const onlyLevelMatch = rule.selector.match(/\.s-lod-only--([0-9\-]+)/);
            if (onlyLevelMatch === null || onlyLevelMatch === void 0 ? void 0 : onlyLevelMatch[1]) {
                const onlyLevels = onlyLevelMatch[1].split('-');
                if (!onlyLevels.includes(levelStr)) {
                    // remove the declaration and stop here
                    decl.remove();
                    return;
                }
            }
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
                var _a, _b, _c, _d;
                // support for @sugar.lods.prevent mixin
                if ((_b = (_a = decl.parent) === null || _a === void 0 ? void 0 : _a.selector) === null || _b === void 0 ? void 0 : _b.match(/\.s-lod--prevent/)) {
                    return;
                }
                // protect the keyframes declarations
                if (((_c = decl.parent.parent) === null || _c === void 0 ? void 0 : _c.name) === 'keyframes') {
                    return;
                }
                // do not process decl that does not have a parent with some selectors
                if (!decl.parent.selectors) {
                    return;
                }
                for (let s of decl.parent.selectors) {
                    if ((_d = sharedData._preventLodSelectors) === null || _d === void 0 ? void 0 : _d.includes(s)) {
                        return;
                    }
                }
                processRuleDecl(decl.parent, decl, levelStr);
            });
        }
        // handle "file" method on rule
        if (settings.lod.method === 'file') {
            root.walkRules(/\.s-lod--[0-9]{1,2}/, (rule) => {
                const level = parseInt(rule.selector.match(/\.s-lod--([0-9]{1,2})/)[1]);
                // // remove the .s-lod-method--%method... class from the selector
                // rule.selector = rule.selector.replace(
                //     /\.s-lod-method--file\s?/gm,
                //     '',
                // );
                // remove the .s-lod--%level... class from the selector
                rule.selector = rule.selector.replace(/\.s-lod--[0-9\s]{1,2}/gm, '');
                // add the rule in the root
                if (!_lodRulesByLevels[level]) {
                    _lodRulesByLevels[level] = postcssApi.root({});
                }
                _lodRulesByLevels[level].nodes.push(rule.clone());
                // remove the rule from the actual css
                rule.remove();
            });
        }
        // clean empty rules
        root.walkRules((rule) => {
            var _a;
            // support for @sugar.lods.prevent mixin
            // @ts-ignore
            if (rule._preventLod) {
                return;
            }
            for (let [levelStr, obj] of Object.entries((_a = rule._lod) !== null && _a !== void 0 ? _a : {})) {
                const level = parseInt(levelStr), lodObj = obj;
                if (!_lodRulesByLevels[level]) {
                    _lodRulesByLevels[level] = postcssApi.root();
                }
                if (lodObj.properties.length) {
                    switch (settings.lod.method) {
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
                            _lodRulesByLevels[level].nodes.push(newRule);
                            break;
                    }
                }
            }
        });
        // empty rules
        root.walkRules((rule) => {
            var _a;
            if (!((_a = rule.nodes) === null || _a === void 0 ? void 0 : _a.length) ||
                !rule.nodes.filter((n) => n.type !== 'comment').length) {
                rule.remove();
                return;
            }
        });
        // remove .s-lod-only-... in selectors
        root.walkRules(/\.s-lod-only--[0-9\-]+/, (rule) => {
            rule.selectors = rule.selectors.map((sel) => {
                return sel.replace(/\.s-lod-only--[0-9\-]+\s?/gm, '');
            });
        });
        // remove .s-lod--prevent in selectors
        root.walkRules(/\.s-lod--prevent/, (rule) => {
            rule.selectors = rule.selectors.map((sel) => {
                return sel.replace(/\.s-lod--prevent\s?/gm, '');
            });
        });
        // // classmap
        // classmap.applyOnAst(root);
        // classmap.save();
        if (settings.lod.method === 'file') {
            const filePath = root.source.input.file;
            for (let [level, lodRoot] of Object.entries(_lodRulesByLevels)) {
                if (parseInt(level) === 0) {
                    continue;
                }
                const outPath = filePath
                    .replace(/\.css$/, `.lod-${level}.css`)
                    .replace(__srcCssDir(), `${__distCssDir()}/lod`);
                let finalCss = '';
                // build final css (minify, etc...)
                finalCss += `\n${lodRoot.toString()}`;
                // clean css (empty rules)
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
                // resolve plugins
                const plugins = [];
                for (let i = 0; i < settings.plugins.length; i++) {
                    const p = settings.plugins[i];
                    if (typeof p === 'string') {
                        const { default: plugin } = yield import(p);
                        const fn = (_b = plugin.default) !== null && _b !== void 0 ? _b : plugin;
                        plugins.push(fn);
                    }
                }
                // apply plugins on resulting css
                finalCss = (yield postcssApi(plugins).process(finalCss, {
                    from: filePath,
                })).css;
                // minify if needed
                if (settings.target === 'production') {
                    finalCss = __csso.minify(finalCss, {
                        restructure: false,
                        comments: false,
                    }).css;
                }
                // write file on disk
                __writeFileSync(outPath, finalCss);
                const file = new __SFile(outPath);
                console.log(`<green>[save]</green> Lod (level of details) file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckUsT0FBTyxLQUFLLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBWXpELElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzFCLDBDQUEwQztBQUMxQyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUU3QixNQUFNLENBQUMsT0FBTyxXQUFpQixFQUMzQixJQUFJLEVBQ0osVUFBVSxFQUNWLFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxFQUNSLE9BQU8sR0FDVjs7O1FBQ0csNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsT0FBTyxDQUFBLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQsU0FBUyx3QkFBd0IsQ0FDN0IsSUFBUyxFQUNULFFBQWlCLEVBQ2pCLFFBQWdFO1lBRWhFLE1BQU0sYUFBYSxxQkFDWixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1lBRUYsTUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1lBRWxDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzNCLDhDQUE4QztnQkFDOUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7b0JBQ3ZDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87aUJBQ1Y7Z0JBRUQsa0NBQWtDO2dC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