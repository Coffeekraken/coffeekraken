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