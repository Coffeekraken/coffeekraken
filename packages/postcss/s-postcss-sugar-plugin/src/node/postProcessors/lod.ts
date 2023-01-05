import __SFile from '@coffeekraken/s-file';
import {
    __distCssDir,
    __packageRootDir,
    __srcCssDir,
} from '@coffeekraken/sugar/path';
import * as __csso from 'csso';

import { __writeFileSync } from '@coffeekraken/sugar/fs';

interface IScopesPostProcessorNodeToTreatLods {
    properties: any[];
}

interface IScopesPostProcessorNodeToTreat {
    _lod: Record<string, IScopesPostProcessorNodeToTreatLods>;
}

interface IScopesPostProcessorLodRuleSelectorsSettings {}

let _timeoutsByLevel = {};
// const sharedData.lodRulesByLevels = {};
const _lodRulesByLevels = {};

export default async function ({
    root,
    sharedData,
    postcssApi,
    settings,
    getRoot,
}) {
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

        //
        root.walkDecls(propertiesReg, (decl) => {
            // support for @sugar.lods.prevent mixin
            if (decl.parent._preventLod) {
                return;
            }

            // protect the keyframes declarations
            if (decl.parent.parent?.name === 'keyframes') {
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
    root.walkRules(/\.s-lod-method--file/, (rule) => {
        const level = parseInt(rule.selector.match(/\.s-lod--([0-9]{1,2})/)[1]);

        // remove the .s-lod-method--%method... class from the selector
        rule.selector = rule.selector.replace(/\.s-lod-method--file\s?/gm, '');

        // remove the .s-lod--%level... class from the selector
        rule.selector = rule.selector.replace(/\.s-lod--[0-9\s]{1,2}/gm, '');

        // add the rule in the root
        if (!_lodRulesByLevels[level]) {
            _lodRulesByLevels[level] = postcssApi.root();
        }
        _lodRulesByLevels[level].nodes.push(rule.clone());

        // remove the rule from the actual css
        rule.remove();
    });

    // clean empty rules
    root.walkRules((rule) => {
        // empty rules
        if (
            !rule.nodes?.length ||
            !rule.nodes.filter((n) => n.type !== 'comment').length
        ) {
            rule.remove();
            return;
        }

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

    if (settings.lod.method === 'file') {
        const filePath = root.source.input.file;

        for (let [level, lodRoot] of Object.entries(_lodRulesByLevels)) {
            if (parseInt(level) === 0) {
                continue;
            }

            const outPath = filePath
                    .replace(/\.css$/, `.lod-${level}.css`)
                    .replace(__srcCssDir(), `${__distCssDir()}/lod`),
                outPathRel = outPath.replace(`${__packageRootDir()}/`, ''),
                filePathRel = filePath.replace(`${__packageRootDir()}/`, '');

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

            // minify if needed
            if (settings.minify) {
                finalCss = __csso.minify(finalCss, {
                    restructure: false,
                    comments: true, // leave all exlamation comments /*! ... */
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
