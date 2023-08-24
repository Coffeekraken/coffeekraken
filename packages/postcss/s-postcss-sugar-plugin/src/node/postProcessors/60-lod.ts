import __SFile from '@coffeekraken/s-file';
import { __distCssDir, __srcCssDir } from '@coffeekraken/sugar/path';
import * as __csso from 'csso';

import __cloneNodes from '../utils/cloneNodes.js';
import __higherRule from '../utils/higherRule.js';

import { __writeFileSync } from '@coffeekraken/sugar/fs';

interface IScopesPostProcessorNodeToTreatLods {
    properties: any[];
}

interface IScopesPostProcessorNodeToTreat {
    _lod: Record<string, IScopesPostProcessorNodeToTreatLods>;
}

interface IScopesPostProcessorLodRuleSelectorsSettings {}

const _lodRulesByLevels = {};

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
            if (sel.startsWith('.s-lod-')) {
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
                finalSelector.push(`.s-lod-${levelStr} ${finalSelectorStr}`);
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
        // do not touch s-icons...
        if (rule.selector.match(/^\.s-icon/)) {
            return;
        }

        // support for @sugar.lod.prevent mixin
        if (rule.selector.match(/\.s-lod-prevent/)) {
            return;
        }

        // support for @sugar.lod.filter mixin
        const filterLevelMatch = rule.selector.match(
            /\.s-lod-filter-([0-9\-]+)/,
        );
        if (filterLevelMatch?.[1]) {
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

        //
        root.walkDecls(propertiesReg, (decl) => {
            // already setted lod with @sugar.lod(...)
            if (decl.parent?.selector?.match(/\.s-lod-[0-9]{1,2}/)) {
                return;
            }

            // do not touch s-icons...
            if (decl.parent?.selector?.match(/^\.s-icon/)) {
                return;
            }

            // support for @sugar.lods.prevent mixin
            if (decl.parent?.selector?.match(/\.s-lod-prevent/)) {
                return;
            }

            // protect the keyframes declarations
            if (decl.parent?.parent?.name === 'keyframes') {
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

    // handle "file" method on rule
    if (settings.lod.method === 'file') {
        root.walkRules(/\.s-lod-[0-9]{1,2}/, (rule) => {
            const level = parseInt(
                rule.selector.match(/\.s-lod-([0-9]{1,2})/)[1],
            );

            // remove the .s-lod-%level... class from the selector
            rule.selector = rule.selector.replace(/\.s-lod-[0-9\s]{1,2}/gm, '');

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
        // support for @sugar.lods.prevent mixin
        // @ts-ignore
        if (rule._preventLod) {
            return;
        }

        for (let [levelStr, obj] of Object.entries(rule._lod ?? {})) {
            const level = parseInt(levelStr),
                lodObj = <IScopesPostProcessorNodeToTreatLods>obj;

            if (!_lodRulesByLevels[level]) {
                _lodRulesByLevels[level] = postcssApi.root();
            }

            if (lodObj.properties.length) {
                switch (settings.lod.method) {
                    case 'class':
                        // @ts-ignore
                        const lodSelectors = generateLodRuleSelectors(
                            rule,
                            levelStr,
                        );

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
        if (
            !rule.nodes?.length ||
            !rule.nodes.filter((n) => n.type !== 'comment').length
        ) {
            rule.remove();
            return;
        }
    });

    // remove .s-lod-filter-... in selectors
    root.walkRules(/\.s-lod-filter-[0-9\-]+/, (rule) => {
        rule.selectors = rule.selectors.map((sel) => {
            return sel.replace(/\.s-lod-filter-[0-9\-]+\s?/gm, '');
        });
    });

    // remove .s-lod-prevent in selectors
    root.walkRules(/\.s-lod-prevent/, (rule) => {
        rule.selectors = rule.selectors.map((sel) => {
            return sel.replace(/\.s-lod-prevent\s?/gm, '');
        });
    });

    // make sure the remaining ".s-lod-..." classes are at the start of each selectors
    root.walkRules(
        /(\.s-lod-[0-9]{1,2}(\:not\(\.s-lod-[0-9]{1,2}\))+)/,
        (rule) => {
            rule.selectors = rule.selectors.map((sel) => {
                const lodSel = sel.match(
                    /(\.s-lod-[0-9]{1,2}(\:not\(\.s-lod-[0-9]{1,2}\))+)/gm,
                );
                if (!lodSel?.[0]) {
                    return rule.selector;
                }
                return `${lodSel[0]} ${sel.replace(lodSel[0], '')}`.replace(
                    /([a-zA-Z0-9])\s\:/gm,
                    '$1:',
                );
            });
        },
    );
    root.walkRules(/(\.s-lod-[0-9]{1,2})/, (rule) => {
        rule.selectors = rule.selectors.map((sel) => {
            const lodSel = sel.match(/(\.s-lod-[0-9]{1,2})/gm);
            if (!lodSel?.[0]) {
                return rule.selector;
            }
            return `${lodSel[0]} ${sel.replace(lodSel[0], '')}`.replace(
                /([a-zA-Z0-9])\s\:/gm,
                '$1:',
            );
        });
    });

    // ensure the [theme^="..."] is at start...
    root.walkRules(/\.s-wireframe\s/, (rule) => {
        rule.selector = rule.selector
            .split(',')
            .map((s) => {
                s = s.trim();

                if (s.match(/^\.s-lod-/)) {
                    s = `${'.s-wireframe'}${s.replace('.s-wireframe', '')}`;
                } else {
                    s = `${'.s-wireframe'} ${s.replace('.s-wireframe', '')}`;
                }

                return s;
            })
            .join(',');
    });

    // ensure the .s-lod-... [theme^="..."] are put together without space...
    root.walkRules(/\.s-lod-[0-9]{1,2}\s\[theme[\^\$]=/, (rule) => {
        rule.selector = rule.selector.replace(
            /\.s-lod-([0-9]{1,2})\s\[theme/gm,
            '.s-lod-$1[theme',
        );
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
                        if (s.match(/^\.s-lod-/) || s.match(/^\.s-wireframe/)) {
                            s = `${match}${s.replace(match, '')}`;
                        } else {
                            s = `${match} ${s.replace(match, '')}`;
                        }
                    });
                }

                return s;
            })
            .join(',');
    });

    // ensure that .s-wireframe selectors does not have any .s-lod-
    root.walkRules(/\.s-wireframe/, (rule) => {
        rule.selector = rule.selector
            .split(',')
            .map((s) => {
                return s.replace(/\.s-lod-[0-9]+/gm, '');
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

    // // remove the @sugar.layout purposly lefted atRule
    // root.walkAtRules((atRule) => {
    //     if (atRule.name !== 'sugar.layout') {
    //         return;
    //     }

    //     atRule.parent.append(atRule.nodes);
    //     atRule.remove();
    // });

    root.walkAtRules((atRule) => {
        if (atRule.name !== 'media') {
            return;
        }

        if (atRule.params.startsWith('container')) {
            atRule.name = 'container';
            atRule.params = atRule.params.replace(/^container\s{1,99}/, '');
        }

        return;

        const newContainer = new postcssApi.AtRule({
            name: 'container',
            params: container.params,
        });

        const newRule = new postcssApi.Rule({
            selector: `${container.parent.selector}`,
            nodes: [],
        });
        newRule.append(__cloneNodes(container.nodes));

        container.nodes.forEach((node) => {
            node.remove();
        });

        newRule.append(__cloneNodes(container.nodes));
        newContainer.append(newRule);

        // container.nodes.forEach((node) => {
        //     // if (node.prop) {
        //     node.remove();
        //     // }
        // });

        const higherRule = __higherRule(container);
        higherRule.after(newContainer);

        container.remove();
    });

    if (settings.lod.method === 'file') {
        const filePath = root.source.input.file;

        for (let [level, lodRoot] of Object.entries(_lodRulesByLevels)) {
            if (parseInt(level) === 0) {
                continue;
            }

            const outPath = filePath
                .replace(/\.css$/, `.lod-${level}.css`)
                .replace(__srcCssDir(), `${__distCssDir()}/lod`);

            let finalCss = '';

            // build final css (minify, etc...)
            finalCss += `\n${lodRoot.toString()}`;

            // clean css (empty rules)
            // @ts-ignore
            const filteredRoot = postcssApi.parse(finalCss);
            filteredRoot.walkRules((r) => {
                if (
                    !r.nodes?.length ||
                    !r.nodes.filter((n) => n.type !== 'comment').length
                ) {
                    r.remove();
                }
            });
            finalCss = filteredRoot.toString().trim();

            // resolve plugins
            const plugins: Function[] = [];
            for (let i = 0; i < settings.plugins.length; i++) {
                const p = settings.plugins[i];
                if (typeof p === 'string') {
                    const { default: plugin } = await import(p);
                    const fn = plugin.default ?? plugin;
                    plugins.push(fn);
                }
            }

            // apply plugins on resulting css
            finalCss = (
                await postcssApi(plugins).process(finalCss, {
                    from: filePath,
                })
            ).css;

            // minify if needed
            if (settings.target === 'production') {
                finalCss = __csso.minify(finalCss, {
                    restructure: false,
                    comments: false,
                }).css;
            }

            // write file on disk
            __writeFileSync(outPath, finalCss);
            const file = new __SFile(outPath);
            console.log(
                `<green>[save]</green> Lod (level of details) file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
            );
        }
    }
}
