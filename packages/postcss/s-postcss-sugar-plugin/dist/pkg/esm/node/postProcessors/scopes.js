var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function ({ root, sharedData, postcssApi, settings, cacheDir, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const nodesToTreat = [];
        function processSelector(sel, scope) {
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
            if (scope) {
                newSelParts.push(`:is(.s-scope--${scope},:not(.s-scope))`);
            }
            else {
                newSelParts.push(`:not(.s-scope)`);
            }
            // middle selector part
            if (selParts.length) {
                newSelParts.push(` ${selParts.join(' ')}`);
            }
            const finalSelectorStr = newSelParts.join('');
            let finalSelector = [];
            // deep support
            finalSelector.push(`${finalSelectorStr}:not(.s-scope--deep ${finalSelectorStr})`);
            if (scope) {
                // select all deep scoped elements
                finalSelector.push(`${finalSelectorStr}:is(.s-scope--deep.s-scope--${scope} ${finalSelectorStr})`);
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
        for (let [scope, scopeObj] of Object.entries(settings.scopes)) {
            const propertiesReg = new RegExp(
            // @ts-ignore
            `(${scopeObj.properties
                .map((prop) => {
                if (!prop.includes('^') && !prop.includes('$')) {
                    prop = `^${prop}$`;
                }
                return prop;
            })
                .join('|')})`);
            root.walkDecls(propertiesReg, (decl) => {
                var _a;
                // support for @sugar.scopes.prevent mixin
                if (decl.parent._preventScopes) {
                    return;
                }
                for (let s of decl.parent.selectors) {
                    if ((_a = sharedData._preventScopesSelectors) === null || _a === void 0 ? void 0 : _a.includes(s)) {
                        return;
                    }
                }
                if (!decl.parent._scopes) {
                    decl.parent._scopes = {};
                }
                if (!decl.parent._scopes[scope]) {
                    decl.parent._scopes[scope] = {
                        properties: [],
                    };
                }
                if (!decl.parent._scopes[scope].properties.includes(decl)) {
                    decl.parent._scopes[scope].properties.push(decl);
                }
                decl.remove();
            });
        }
        // clean empty rules
        root.walkRules((node) => {
            var _a, _b;
            // support for @sugar.scopes.prevent mixin
            // @ts-ignore
            if (node._preventScopes) {
                return;
            }
            // nodes that have no "_scopes" properties are nodes
            // that does not have to be treated
            // if (!node._scopes || !Object.keys(node._scopes).length) {
            //     return;
            // }
            for (let [scope, scopeObj] of Object.entries((_a = node._scopes) !== null && _a !== void 0 ? _a : {})) {
                scopeObj = scopeObj;
                let newSelectors = [];
                // @ts-ignore
                if (scopeObj.properties.length) {
                    node.selectors.forEach((sel) => {
                        const classSelectors = processSelector(sel, scope);
                        for (let s of classSelectors) {
                            if (!newSelectors.includes(s)) {
                                newSelectors.push(s);
                            }
                        }
                    });
                    const newRule = postcssApi.rule({
                        selectors: newSelectors,
                        nodes: scopeObj.properties,
                    });
                    // @ts-ignore
                    node.parent.insertAfter(node, newRule);
                }
            }
            // grab all variables in the node to
            // extract them in the "none-scoped" rule
            const vars = [];
            node.nodes = node.nodes.filter((n) => {
                if (n.variable) {
                    vars.push(n);
                    return false;
                }
                return true;
            });
            if (vars.length) {
                const varsRule = postcssApi.rule({
                    selectors: node.selectors,
                    nodes: vars,
                });
                node.parent.insertBefore(node, varsRule);
            }
            // empty rules
            if (!((_b = node.nodes) === null || _b === void 0 ? void 0 : _b.length) ||
                !node.nodes.filter((n) => n.type !== 'comment').length) {
                node.remove();
                return;
            }
            // process selector
            let newSelectors = [];
            node.selectors.forEach((s) => {
                if (s.includes('.s-scope')) {
                    newSelectors.push(s);
                    return;
                }
                const classSelectors = processSelector(s);
                for (let s of classSelectors) {
                    if (!newSelectors.includes(s)) {
                        newSelectors.push(s);
                    }
                }
            });
            node.selectors = newSelectors;
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVNBLE1BQU0sQ0FBQyxPQUFPLFdBQWlCLEVBQzNCLElBQUksRUFDSixVQUFVLEVBQ1YsVUFBVSxFQUNWLFFBQVEsRUFDUixRQUFRLEdBQ1g7O1FBQ0csTUFBTSxZQUFZLEdBQXNDLEVBQUUsQ0FBQztRQUUzRCxTQUFTLGVBQWUsQ0FBQyxHQUFXLEVBQUUsS0FBYztZQUNoRCx5Q0FBeUM7WUFDekMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ25ELElBQUksTUFBTSxHQUFHLEVBQUUsRUFDWCxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDO1lBRUQscUNBQXFDO1lBQ3JDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzNCLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFckIsc0NBQXNDO1lBQ3RDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3BCO1lBRUQsOEJBQThCO1lBQzlCLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWpCLGdCQUFnQjtZQUNoQixJQUFJLEtBQUssRUFBRTtnQkFDUCxXQUFXLENBQUMsSUFB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