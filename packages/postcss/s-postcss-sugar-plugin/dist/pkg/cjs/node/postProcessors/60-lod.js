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
const fs_1 = require("@coffeekraken/sugar/fs");
const _lodRulesByLevels = {};
function default_1({ root, sharedData, postcssApi, settings }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        var _c;
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
                        const { default: plugin } = yield (_c = p, Promise.resolve().then(() => __importStar(require(_c))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBMkM7QUFDM0MsbURBQXFFO0FBQ3JFLDZDQUErQjtBQUUvQiwrQ0FBeUQ7QUFZekQsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFFN0IsbUJBQStCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOzs7O1FBQ3JFLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsQ0FBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLE9BQU8sQ0FBQSxFQUFFO1lBQ3hCLE9BQU87U0FDVjtRQUVELFNBQVMsd0JBQXdCLENBQzdCLElBQVMsRUFDVCxRQUFpQixFQUNqQixRQUFnRTtZQUVoRSxNQUFNLGFBQWEscUJBQ1osQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztZQUVGLE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztZQUVsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUMzQiw4Q0FBOEM7Z0JBQzlDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO29CQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixPQUFPO2lCQUNWO2dCQUVELGtDQUFrQztnQkFDbEMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUM1QixZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixPQUFPO2lCQUNWO2dCQUVELHlDQUF5QztnQkFDekMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFB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