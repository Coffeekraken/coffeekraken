interface IScopesPostProcessorNodeToTreatLods {
    properties: any[];
}

interface IScopesPostProcessorNodeToTreat {
    _lod: Record<string, IScopesPostProcessorNodeToTreatLods>;
}

interface IScopesPostProcessorLodRuleSelectorsSettings {}

export default async function ({ root, sharedData, postcssApi, settings }) {
    // check if the lod feature is enabled or not
    if (!settings.lod?.enabled) {
        return;
    }

    function generateLodRuleSelectors(
        rule: any,
        levelStr?: string,
        settings?: Partial<IScopesPostProcessorLodRuleSelectorsSettings>,
    ): string[] {
        const finalSettings: IScopesPostProcessorLodRuleSelectorsSettings = {
            ...(settings ?? {}),
        };

        const newSelectors: string[] = [];

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
                    finalSelector.push(
                        `${finalSelectorStr}.s-lod--${levelStr}`,
                    );
                } else {
                    // scope the element into the lod class
                    finalSelector.push(
                        `.s-lod--${levelStr} ${finalSelectorStr}`,
                    );
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

    function processRuleDecl(rule: any, decl: any, levelStr: string): void {
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

    const cssPropertiesObj = settings.lod.cssProperties,
        cssProperties = Object.keys(cssPropertiesObj);

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
                .join('|')})`,
        );

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
            // support for @sugar.lods.prevent mixin
            if (decl.parent._preventLod) {
                return;
            }

            // do not process decl that does not have a parent with some selectors
            if (!decl.parent.selectors) {
                return;
            }

            for (let s of decl.parent.selectors) {
                if (sharedData._preventLodSelectors?.includes(s)) {
                    return;
                }
            }

            processRuleDecl(decl.parent, decl, levelStr);
        });
    }

    // clean empty rules
    root.walkRules((rule) => {
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

        for (let [levelStr, obj] of Object.entries(rule._lod ?? {})) {
            const level = parseInt(levelStr),
                lodObj = <IScopesPostProcessorNodeToTreatLods>obj;

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
        if (
            !rule.nodes?.length ||
            !rule.nodes.filter((n) => n.type !== 'comment').length
        ) {
            rule.remove();
            return;
        }
    });
}
