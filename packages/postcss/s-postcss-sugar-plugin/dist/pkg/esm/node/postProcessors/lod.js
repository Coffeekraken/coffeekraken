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
        function processSelector(sel, lod) {
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
            if (lod) {
                newSelParts.push(`:is(.s-lod--${lod},:not(.s-lod))`);
            }
            else {
                newSelParts.push(`:not(.s-lod)`);
            }
            // middle selector part
            if (selParts.length) {
                newSelParts.push(` ${selParts.join(' ')}`);
            }
            const finalSelectorStr = newSelParts.join('');
            let finalSelector = [];
            // deep support
            finalSelector.push(`${finalSelectorStr}:not(.s-lod--deep ${finalSelectorStr})`);
            if (lod) {
                // select all deep lodd elements
                finalSelector.push(`${finalSelectorStr}:is(.s-lod--deep.s-lod--${lod} ${finalSelectorStr})`);
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
            return finalSelector;
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
            root.walkDecls(propertiesReg, (decl) => {
                var _a;
                // support for @sugar.scopes.prevent mixin
                if (decl.parent._preventLod) {
                    return;
                }
                // do not process decl that does not have a parent with some selectors
                if (!decl.parent.selectors) {
                    return;
                }
                try {
                    for (let s of decl.parent.selectors) {
                        if ((_a = sharedData._preventLodSelectors) === null || _a === void 0 ? void 0 : _a.includes(s)) {
                            return;
                        }
                    }
                }
                catch (e) {
                    throw e;
                }
                if (!decl.parent._lod) {
                    decl.parent._lod = {};
                }
                if (!decl.parent._lod[levelStr]) {
                    decl.parent._lod[levelStr] = {
                        properties: [],
                    };
                }
                if (!decl.parent._lod[levelStr].properties.includes(decl)) {
                    decl.parent._lod[levelStr].properties.push(decl);
                }
                decl.remove();
            });
        }
        // clean empty rules
        root.walkRules((node) => {
            var _a, _b;
            // support for @sugar.scopes.prevent mixin
            // @ts-ignore
            if (node._preventLod) {
                return;
            }
            // nodes that have no "_lod" properties are nodes
            // that does not have to be treated
            // if (!node._lod || !Object.keys(node._lod).length) {
            //     return;
            // }
            for (let [levelStr, obj] of Object.entries((_a = node._lod) !== null && _a !== void 0 ? _a : {})) {
                const level = parseInt(levelStr), lodObj = obj;
                let newSelectors = [];
                // @ts-ignore
                if (lodObj.properties.length) {
                    node.selectors.forEach((sel) => {
                        const classSelectors = processSelector(sel, levelStr);
                        for (let s of classSelectors) {
                            if (!newSelectors.includes(s)) {
                                newSelectors.push(s);
                            }
                        }
                    });
                    const newRule = postcssApi.rule({
                        selectors: newSelectors,
                        nodes: lodObj.properties,
                    });
                    // @ts-ignore
                    node.parent.insertAfter(node, newRule);
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
            if (!((_b = node.nodes) === null || _b === void 0 ? void 0 : _b.length) ||
                !node.nodes.filter((n) => n.type !== 'comment').length) {
                node.remove();
                return;
            }
            // process selector
            // let newSelectors: string[] = [];
            // node.selectors.forEach((s) => {
            //     if (s.includes('.s-lod')) {
            //         newSelectors.push(s);
            //         return;
            //     }
            //     const classSelectors = processSelector(s);
            //     for (let s of classSelectors) {
            //         if (!newSelectors.includes(s)) {
            //             newSelectors.push(s);
            //         }
            //     }
            // });
            // node.selectors = newSelectors;
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVFBLE1BQU0sQ0FBQyxPQUFPLFdBQWlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOztRQUNyRSxTQUFTLGVBQWUsQ0FBQyxHQUFXLEVBQUUsR0FBWTtZQUM5Qyx5Q0FBeUM7WUFDekMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ25ELElBQUksTUFBTSxHQUFHLEVBQUUsRUFDWCxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDO1lBRUQscUNBQXFDO1lBQ3JDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzNCLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFckIsc0NBQXNDO1lBQ3RDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3BCO1lBRUQsOEJBQThCO1lBQzlCLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWpCLGdCQUFnQjtZQUNoQixJQUFJLEdBQUcsRUFBRTtnQkFDTCxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3hEO2lC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