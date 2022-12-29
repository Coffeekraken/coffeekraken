interface IScopesPostProcessorNodeToTreatLods {
    properties: any[];
}

interface IScopesPostProcessorNodeToTreat {
    _lod: Record<string, IScopesPostProcessorNodeToTreatLods>;
}

export default async function ({ root, sharedData, postcssApi, settings }) {
    function processSelector(sel: string, lod?: string): string[] {
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
        if (lod) {
            newSelParts.push(`:is(.s-lod--${lod},:not(.s-lod))`);
        } else {
            newSelParts.push(`:not(.s-lod)`);
        }

        // middle selector part
        if (selParts.length) {
            newSelParts.push(` ${selParts.join(' ')}`);
        }

        const finalSelectorStr = newSelParts.join('');

        let finalSelector = [];

        // deep support
        finalSelector.push(
            `${finalSelectorStr}:not(.s-lod--deep ${finalSelectorStr})`,
        );
        if (lod) {
            // select all deep lodd elements
            finalSelector.push(
                `${finalSelectorStr}:is(.s-lod--deep.s-lod--${lod} ${finalSelectorStr})`,
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

    const cssPropertiesObj = settings.lod.cssProperties,
        cssProperties = Object.keys(cssPropertiesObj);

    for (let [levelStr, id] of Object.entries(settings.lod.levels)) {
        // cast level into number
        const level = parseInt(levelStr),
            levelId = <string>id;

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
                .join('|')})`,
        );

        // if nothing to target in the current lod level
        // continue to the next
        if (propertiesReg.toString() === '/()/') {
            continue;
        }

        root.walkDecls(propertiesReg, (decl) => {
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
                    if (sharedData._preventLodSelectors?.includes(s)) {
                        return;
                    }
                }
            } catch (e) {
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

        for (let [levelStr, obj] of Object.entries(node._lod ?? {})) {
            const level = parseInt(levelStr),
                lodObj = <IScopesPostProcessorNodeToTreatLods>obj;

            let newSelectors: string[] = [];

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
        if (
            !node.nodes?.length ||
            !node.nodes.filter((n) => n.type !== 'comment').length
        ) {
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
}
