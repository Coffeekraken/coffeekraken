interface IScopesPostProcessorNodeToTreatScopes {
    selectors: string[];
    properties: any[];
}

interface IScopesPostProcessorNodeToTreat {
    _scopes: Record<string, IScopesPostProcessorNodeToTreatScopes>;
}

export default async function ({
    root,
    sharedData,
    postcssApi,
    settings,
    cacheDir,
}) {
    const nodesToTreat: IScopesPostProcessorNodeToTreat[] = [];

    function processSelector(sel: string, scope?: string): string[] {
        // handle pseudo classes ":after", etc...
        const pseudoMatch = sel.match(/(\:{1,2})[a-z-]+$/);
        let pseudo = '',
            theme = '';
        if (pseudoMatch) {
            pseudo = pseudoMatch[0];
            sel = sel.replace(pseudo, '');
        }

        // split the selector to construct it
        const selParts = sel.split(' '),
            newSelParts = [];

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
        } else {
            newSelParts.push(`:not(.s-scope)`);
        }

        // middle selector part
        if (selParts.length) {
            newSelParts.push(` ${selParts.join(' ')}`);
        }

        const finalSelectorStr = newSelParts.join('');

        let finalSelector = [];

        // deep support
        finalSelector.push(
            `${finalSelectorStr}:not(.s-scope--deep ${finalSelectorStr})`,
        );
        if (scope) {
            // select all deep scoped elements
            finalSelector.push(
                `${finalSelectorStr}:is(.s-scope--deep.s-scope--${scope} ${finalSelectorStr})`,
            );
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
                .join('|')})`,
        );

        root.walkDecls(propertiesReg, (decl) => {
            // support for @sugar.scopes.prevent mixin
            if (decl.parent._preventScopes) {
                return;
            }
            for (let s of decl.parent.selectors) {
                if (sharedData._preventScopesSelectors?.includes(s)) {
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

        for (let [scope, scopeObj] of Object.entries(node._scopes ?? {})) {
            scopeObj = <IScopesPostProcessorNodeToTreatScopes>scopeObj;

            let newSelectors: string[] = [];

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
        const vars: any[] = [];
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
        if (
            !node.nodes?.length ||
            !node.nodes.filter((n) => n.type !== 'comment').length
        ) {
            node.remove();
            return;
        }

        // process selector
        let newSelectors: string[] = [];
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
}
