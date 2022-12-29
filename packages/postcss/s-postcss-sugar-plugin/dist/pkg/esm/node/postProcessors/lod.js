var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function ({ root, sharedData, postcssApi, settings }) {
    return __awaiter(this, void 0, void 0, function* () {
        function getLodRuleSelectors(rule, levelStr, settings) {
            const finalSettings = Object.assign({ local: true, deep: true }, (settings !== null && settings !== void 0 ? settings : {}));
            const newSelectors = [];
            rule.selectors.forEach((sel) => {
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
                // scope related
                if (finalSettings.local) {
                    if (levelStr) {
                        newSelParts.push(`:is(.s-lod--${levelStr},:not(.s-lod))`);
                    }
                    else {
                        newSelParts.push(`:not(.s-lod)`);
                    }
                }
                // middle selector part
                if (selParts.length) {
                    newSelParts.push(` ${selParts.join(' ')}`);
                }
                const finalSelectorStr = newSelParts.join('');
                let finalSelector = [];
                // deep support
                if (finalSettings.deep) {
                    finalSelector.push(`${finalSelectorStr}:not(.s-lod--deep ${finalSelectorStr})`);
                    if (levelStr) {
                        // select all deep lodd elements
                        finalSelector.push(`${finalSelectorStr}:is(.s-lod--deep.s-lod--${levelStr} ${finalSelectorStr})`);
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
        for (let [levelStr, id] of Object.entries(settings.lod.levels)) {
            // cast level into number
            const level = parseInt(levelStr), levelId = id;
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
            // process then "@sugar.lod.when" noted rules
            root.walkRules(/^.s-lod-when--[0-9]{1,2}/, (rule) => {
                // make sure we handle the same rule only once
                // if (!rule._sLodWhen || rule._sLodWhen._handled) {
                //     return;
                // }
                // rule._sLodWhen._handled = true;
                let level = 0, method = 'class';
                try {
                    level = parseInt(rule.selector.match(/.s-lod-when--([0-9]{1,2})/)[1]);
                    method = rule.selector.match(/.s-lod-method--([a-z]+)/)[1];
                }
                catch (e) { }
                // remove the special internal s-log-when--... class
                rule.selector = rule.selector
                    .replace(/.s-lod-when--[0-9]{1,2}/gm, '')
                    .replace(/.s-lod-method--[a-z]+/gm, '');
                switch (method) {
                    case 'remove':
                        break;
                    case 'file':
                        break;
                    case 'class':
                        // get lod selectors
                        const lodSelectors = getLodRuleSelectors(rule, `${level}`, {
                            local: false,
                        });
                        // create the new class scoped rule
                        const newRule = postcssApi.rule({
                            selectors: rule.selectors,
                            nodes: rule.nodes,
                        });
                        rule.parent.insertAfter(rule, newRule);
                        // hide rule
                        const hideRule = postcssApi.rule({
                            selectors: rule.selectors.map((s) => {
                                return `${s}:not(.s-lod--deep.s-lod--${level} ${s})`;
                            }),
                            nodes: [
                                postcssApi.decl({
                                    prop: 'display',
                                    value: 'none !important',
                                }),
                            ],
                        });
                        rule.parent.insertAfter(rule, hideRule);
                        // remove the rule itself
                        // cause it has been replaced with the lod scoped one
                        rule.remove();
                        break;
                    default:
                        throw new Error(`<red>[postcssSugarPlugin.lod]</red> The specified "<yellow>${rule._sLodWhen.method}</yellow>" lod (level of details) method does not exists... Use one of these: <yellow>remove</yellow>, <yellow>file</yellow> or <yellow>class</yellow>`);
                        break;
                }
            });
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
        // clean empty rules
        root.walkRules((rule) => {
            var _a, _b;
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
                // @ts-ignore
                if (lodObj.properties.length) {
                    const lodSelectors = getLodRuleSelectors(rule, levelStr);
                    const newRule = postcssApi.rule({
                        selectors: lodSelectors,
                        nodes: lodObj.properties,
                    });
                    // @ts-ignore
                    rule.parent.insertAfter(rule, newRule);
                }
            }
            // grab all variables in the node to
            // extract them in the "none-lod" rule
            // const vars: any[] = [];
            // node.nodes = node.nodes.filter((n) => {
            //     if (n.variable) {
            //         vars.push(n);
            //         return false;
            //     }
            //     return true;
            // });
            // if (vars.length) {
            //     const varsRule = postcssApi.rule({
            //         selectors: node.selectors,
            //         nodes: vars,
            //     });
            //     node.parent.insertBefore(node, varsRule);
            // }
            // empty rules
            if (!((_b = rule.nodes) === null || _b === void 0 ? void 0 : _b.length) ||
                !rule.nodes.filter((n) => n.type !== 'comment').length) {
                rule.remove();
                return;
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQWFBLE1BQU0sQ0FBQyxPQUFPLFdBQWlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOztRQUNyRSxTQUFTLG1CQUFtQixDQUN4QixJQUFTLEVBQ1QsUUFBaUIsRUFDakIsUUFBZ0U7WUFFaEUsTUFBTSxhQUFhLG1CQUNmLEtBQUssRUFBRSxJQUFJLEVBQ1gsSUFBSSxFQUFFLElBQUksSUFDUCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1lBRUYsTUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1lBRWxDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzNCLHlDQUF5QztnQkFDekMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQ1gsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDZixJQUFJLFdBQVcsRUFBRTtvQkFDYixNQUFNLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ2pDO2dCQUVELHFDQUFxQztnQkFDckMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDM0IsV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFFckIsc0NBQXNDO2dCQUN0QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ2xDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JB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