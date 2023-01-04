"use strict";
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
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("@coffeekraken/sugar/fs");
let _timeoutsByLevel = {};
// const sharedData.lodRulesByLevels = {};
const lodRootsByFile = {};
let currentCssByLevel = {};
function default_1({ root, sharedData, postcssApi, settings, getRoot, }) {
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
                .replace((0, path_1.__srcCssDir)(), `${(0, path_1.__distCssDir)()}/lod`), outPathRel = outPath.replace(`${(0, path_1.__packageRootDir)()}/`, ''), filePath = root.source.input.file, filePathRel = filePath.replace(`${(0, path_1.__packageRootDir)()}/`, '');
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
                if (fs_1.default.existsSync(outPath)) {
                    currentCssByLevel[level] = fs_1.default
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
            (0, fs_2.__writeFileSync)(outPath, currentCssByLevel[level]);
            const file = new s_file_1.default(outPath);
            console.log(`<green>[save]</green> Lod (level of details) file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
            // }, 500);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLG1EQUlrQztBQUNsQyw0Q0FBc0I7QUFFdEIsK0NBQXlEO0FBWXpELElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzFCLDBDQUEwQztBQUMxQyxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFFM0IsbUJBQStCLEVBQzNCLElBQUksRUFDSixVQUFVLEVBQ1YsVUFBVSxFQUNWLFFBQVEsRUFDUixPQUFPLEdBQ1Y7OztRQUNHLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsQ0FBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLE9BQU8sQ0FBQSxFQUFFO1lBQ3hCLE9BQU87U0FDVjtRQUNELFNBQVMsd0JBQXdCLENBQzdCLElBQVMsRUFDVCxRQUFpQixFQUNqQixRQUFnRTtZQUVoRSxNQUFNLGFBQWEscUJBQ1osQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztZQUVGLE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztZQUVsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUMzQiw4Q0FBOEM7Z0JBQzlDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO29CQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixPQUFPO2lCQUNWO2dCQUVELGtDQUFrQztnQkFDbEMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUM1QixZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixPQUFPO2lC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