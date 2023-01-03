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
            // // process then "@sugar.lod.when" noted rules
            // root.walkRules(/.s-lod-when--[0-9]{1,2}/, (rule) => {
            //     // make sure we handle the same rule only once
            //     // if (!rule._sLodWhen || rule._sLodWhen._handled) {
            //     //     return;
            //     // }
            //     // rule._sLodWhen._handled = true;
            //     let level = 0,
            //         method = 'class';
            //     try {
            //         level = parseInt(
            //             rule.selector.match(/.s-lod-when--([0-9]{1,2})/)[1],
            //         );
            //         method = rule.selector.match(/.s-lod-method--([a-z]+)/)[1];
            //     } catch (e) {}
            //     // remove the special internal s-log-when--... class
            //     rule.selector = rule.selector
            //         .replace(/.s-lod-when--[0-9]{1,2}/gm, '')
            //         .replace(/.s-lod-method--[a-z]+/gm, '');
            //     switch (method) {
            //         case 'remove':
            //             break;
            //         case 'file':
            //             break;
            //         case 'class':
            //             // // get lod selectors
            //             // const lodSelectors = generateLodRuleSelectors(
            //             //     rule,
            //             //     `${level}`,
            //             //     {
            //             //         local: false,
            //             //     },
            //             // );
            //             // create the new class scoped rule
            //             const newRule = postcssApi.rule({
            //                 selectors: rule.selectors.map((sel) => {
            //                     return `.s-lod--${level} ${sel}`;
            //                 }),
            //                 nodes: rule.nodes,
            //             });
            //             rule.parent.insertAfter(rule, newRule);
            //             // // hide rule
            //             // const hideRule = postcssApi.rule({
            //             //     selectors: rule.selectors.map((s) => {
            //             //         return `${s}:not(.s-lod--${level} ${s})`;
            //             //     }),
            //             //     nodes: [
            //             //         postcssApi.decl({
            //             //             prop: 'display',
            //             //             value: 'none !important',
            //             //         }),
            //             //     ],
            //             // });
            //             // rule.parent.insertAfter(rule, hideRule);
            //             // remove the rule itself
            //             // cause it has been replaced with the lod scoped one
            //             rule.remove();
            //             break;
            //         default:
            //             throw new Error(
            //                 `<red>[postcssSugarPlugin.lod]</red> The specified "<yellow>${rule._sLodWhen.method}</yellow>" lod (level of details) method does not exists... Use one of these: <yellow>remove</yellow>, <yellow>file</yellow> or <yellow>class</yellow>`,
            //             );
            //             break;
            //     }
            // });
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
                    const lodSelectors = generateLodRuleSelectors(rule, levelStr);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVVBLE1BQU0sQ0FBQyxPQUFPLFdBQWlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOzs7UUFDckUsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsT0FBTyxDQUFBLEVBQUU7WUFDeEIsT0FBTztTQUNWO1FBRUQsU0FBUyx3QkFBd0IsQ0FDN0IsSUFBUyxFQUNULFFBQWlCLEVBQ2pCLFFBQWdFO1lBRWhFLE1BQU0sYUFBYSxxQkFDWixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1lBRUYsTUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1lBRWxDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzNCLDhDQUE4QztnQkFDOUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7b0JBQ3ZDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87aUJBQ1Y7Z0JBRUQsa0NBQWtDO2dCQUNsQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzVCLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87aUJBQ1Y7Z0JBRUQseUNBQXlDO2dCQUN6QyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ25ELElBQUksTUFBTSxHQUFHLEVBQUUsRUFDWCxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNmLElBQUksV0FBVyxFQUFFO29CQUNiLE1BQU0sR0FB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