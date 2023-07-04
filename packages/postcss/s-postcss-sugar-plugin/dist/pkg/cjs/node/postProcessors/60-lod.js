"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const path_1 = require("@coffeekraken/sugar/path");
const __csso = __importStar(require("csso"));
const cloneNodes_1 = __importDefault(require("../utils/cloneNodes"));
const higherRule_1 = __importDefault(require("../utils/higherRule"));
const fs_1 = require("@coffeekraken/sugar/fs");
const _lodRulesByLevels = {};
function default_1({ root, sharedData, postcssApi, settings }) {
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
                // theme attribute (@sugar.theme)
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
                    // scope the element into the lod class
                    finalSelector.push(`.s-lod--${levelStr} ${finalSelectorStr}`);
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
            // do not touch s-icons...
            if (rule.selector.match(/^\.s-icon/)) {
                return;
            }
            // support for @sugar.lod.prevent mixin
            if (rule.selector.match(/\.s-lod--prevent/)) {
                return;
            }
            // support for @sugar.lod.filter mixin
            const filterLevelMatch = rule.selector.match(/\.s-lod-filter--([0-9\-]+)/);
            if (filterLevelMatch === null || filterLevelMatch === void 0 ? void 0 : filterLevelMatch[1]) {
                const filterLevels = filterLevelMatch[1].split('-');
                if (!filterLevels.includes(levelStr)) {
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
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                // already setted lod with @sugar.lod(...)
                if ((_b = (_a = decl.parent) === null || _a === void 0 ? void 0 : _a.selector) === null || _b === void 0 ? void 0 : _b.match(/\.s-lod--[0-9]{1,2}/)) {
                    return;
                }
                // do not touch s-icons...
                if ((_d = (_c = decl.parent) === null || _c === void 0 ? void 0 : _c.selector) === null || _d === void 0 ? void 0 : _d.match(/^\.s-icon/)) {
                    return;
                }
                // support for @sugar.lods.prevent mixin
                if ((_f = (_e = decl.parent) === null || _e === void 0 ? void 0 : _e.selector) === null || _f === void 0 ? void 0 : _f.match(/\.s-lod--prevent/)) {
                    return;
                }
                // protect the keyframes declarations
                if (((_h = (_g = decl.parent) === null || _g === void 0 ? void 0 : _g.parent) === null || _h === void 0 ? void 0 : _h.name) === 'keyframes') {
                    return;
                }
                // do not process decl that does not have a parent with some selectors
                if (!decl.parent.selectors) {
                    return;
                }
                for (let s of decl.parent.selectors) {
                    if ((_j = sharedData._preventLodSelectors) === null || _j === void 0 ? void 0 : _j.includes(s)) {
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
        // remove .s-lod-filter-... in selectors
        root.walkRules(/\.s-lod-filter--[0-9\-]+/, (rule) => {
            rule.selectors = rule.selectors.map((sel) => {
                return sel.replace(/\.s-lod-filter--[0-9\-]+\s?/gm, '');
            });
        });
        // remove .s-lod--prevent in selectors
        root.walkRules(/\.s-lod--prevent/, (rule) => {
            rule.selectors = rule.selectors.map((sel) => {
                return sel.replace(/\.s-lod--prevent\s?/gm, '');
            });
        });
        // make sure the remaining ".s-lod--..." classes are at the start of each selectors
        root.walkRules(/(\.s-lod--[0-9]{1,2}(\:not\(\.s-lod--[0-9]{1,2}\))+)/, (rule) => {
            rule.selectors = rule.selectors.map((sel) => {
                const lodSel = sel.match(/(\.s-lod--[0-9]{1,2}(\:not\(\.s-lod--[0-9]{1,2}\))+)/gm);
                if (!(lodSel === null || lodSel === void 0 ? void 0 : lodSel[0])) {
                    return rule.selector;
                }
                return `${lodSel[0]} ${sel.replace(lodSel[0], '')}`.replace(/([a-zA-Z0-9])\s\:/gm, '$1:');
            });
        });
        root.walkRules(/(\.s-lod--[0-9]{1,2})/, (rule) => {
            rule.selectors = rule.selectors.map((sel) => {
                const lodSel = sel.match(/(\.s-lod--[0-9]{1,2})/gm);
                if (!(lodSel === null || lodSel === void 0 ? void 0 : lodSel[0])) {
                    return rule.selector;
                }
                return `${lodSel[0]} ${sel.replace(lodSel[0], '')}`.replace(/([a-zA-Z0-9])\s\:/gm, '$1:');
            });
        });
        // ensure the [theme^="..."] is at start...
        root.walkRules(/\.s-wireframe\s/, (rule) => {
            rule.selector = rule.selector
                .split(',')
                .map((s) => {
                s = s.trim();
                if (s.match(/^\.s-lod--/)) {
                    s = `${'.s-wireframe'}${s.replace('.s-wireframe', '')}`;
                }
                else {
                    s = `${'.s-wireframe'} ${s.replace('.s-wireframe', '')}`;
                }
                return s;
            })
                .join(',');
        });
        // ensure the .s-lod--... [theme^="..."] are put together without space...
        root.walkRules(/\.s-lod--[0-9]{1,2}\s\[theme[\^\$]=/, (rule) => {
            rule.selector = rule.selector.replace(/\.s-lod--([0-9]{1,2})\s\[theme/gm, '.s-lod--$1[theme');
        });
        // ensure the [theme^="..."] is at start...
        root.walkRules(/\[theme[\^\$]=\".*\"\]/, (rule) => {
            rule.selector = rule.selector
                .split(',')
                .map((s) => {
                s = s.trim();
                const matches = s.match(/\[theme[\^\$]=\".*\"\]/gm);
                if (matches) {
                    matches.forEach((match) => {
                        if (s.match(/^\.s-lod--/) ||
                            s.match(/^\.s-wireframe/)) {
                            s = `${match}${s.replace(match, '')}`;
                        }
                        else {
                            s = `${match} ${s.replace(match, '')}`;
                        }
                    });
                }
                return s;
            })
                .join(',');
        });
        // ensure that .s-wireframe selectors does not have any .s-lod---
        root.walkRules(/\.s-wireframe/, (rule) => {
            rule.selector = rule.selector
                .split(',')
                .map((s) => {
                return s.replace(/\.s-lod--[0-9]+/gm, '');
            })
                .join(',');
        });
        root.walkRules((rule) => {
            rule.selector = rule.selector
                .split(',')
                .map((s) => {
                s = s.trim();
                s = s.replace(/\s{2,999}/gm, ' ');
                return s;
            })
                .join(',');
        });
        // // remove the @sugar.layout purposly lefted atRule
        // root.walkAtRules((atRule) => {
        //     if (atRule.name !== 'sugar.layout') {
        //         return;
        //     }
        //     atRule.parent.append(atRule.nodes);
        //     atRule.remove();
        // });
        root.walkAtRules((atRule) => {
            if (atRule.name !== 'media') {
                return;
            }
            if (atRule.params.startsWith('container')) {
                atRule.name = 'container';
                atRule.params = atRule.params.replace(/^container\s{1,99}/, '');
            }
            return;
            const newContainer = new postcssApi.AtRule({
                name: 'container',
                params: container.params,
            });
            const newRule = new postcssApi.Rule({
                selector: `${container.parent.selector}`,
                nodes: [],
            });
            newRule.append((0, cloneNodes_1.default)(container.nodes));
            container.nodes.forEach((node) => {
                node.remove();
            });
            newRule.append((0, cloneNodes_1.default)(container.nodes));
            newContainer.append(newRule);
            // container.nodes.forEach((node) => {
            //     // if (node.prop) {
            //     node.remove();
            //     // }
            // });
            const higherRule = (0, higherRule_1.default)(container);
            higherRule.after(newContainer);
            container.remove();
        });
        if (settings.lod.method === 'file') {
            const filePath = root.source.input.file;
            for (let [level, lodRoot] of Object.entries(_lodRulesByLevels)) {
                if (parseInt(level) === 0) {
                    continue;
                }
                const outPath = filePath
                    .replace(/\.css$/, `.lod-${level}.css`)
                    .replace((0, path_1.__srcCssDir)(), `${(0, path_1.__distCssDir)()}/lod`);
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
                (0, fs_1.__writeFileSync)(outPath, finalCss);
                const file = new s_file_1.default(outPath);
                console.log(`<green>[save]</green> Lod (level of details) file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
            }
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBMkM7QUFDM0MsbURBQXFFO0FBQ3JFLDZDQUErQjtBQUUvQixxRUFBK0M7QUFDL0MscUVBQStDO0FBRS9DLCtDQUF5RDtBQVl6RCxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUU3QixtQkFBK0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7OztRQUNyRSw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxPQUFPLENBQUEsRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFFRCxTQUFTLHdCQUF3QixDQUM3QixJQUFTLEVBQ1QsUUFBaUIsRUFDakIsUUFBZ0U7WUFFaEUsTUFBTSxhQUFhLHFCQUNaLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7WUFFRixNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7WUFFbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDM0IsOENBQThDO2dCQUM5QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtvQkFDdkMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkIsT0FBTztpQkFDVjtnQkFFRCxrQ0FBa0M7Z0JBQ2xDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDNUIsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkIsT0FBTztpQkFDVjtnQkFFRCx5Q0FBeUM7Z0JBQ3pDLE1BQU0sV0FBVyxHQUFH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