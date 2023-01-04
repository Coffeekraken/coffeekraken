import __SFile from '@coffeekraken/s-file';
import {
    __distCssDir,
    __packageRootDir,
    __srcCssDir,
} from '@coffeekraken/sugar/path';
import __fs from 'fs';

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
const lodRootsByFile = {};
let currentCssByLevel = {};

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
        const method = rule.selector.match(/\.s-lod-method--([a-z]+)/)[1],
            level = parseInt(rule.selector.match(/\.s-lod--([0-9]{1,2})/)[1]);

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

            if (lodObj.properties.length) {
                switch (settings.lod.defaultMethod) {
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
                        sharedData.lodRulesByLevels[level][filePath].nodes.push(
                            newRule,
                        );
                        break;
                }
            }
        }
        // grab all variables in the node to
        // extract them in the "none-lod" rule
        const vars: any[] = [];
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
                .replace(__srcCssDir(), `${__distCssDir()}/lod`),
            outPathRel = outPath.replace(`${__packageRootDir()}/`, ''),
            filePath = root.source.input.file,
            filePathRel = filePath.replace(`${__packageRootDir()}/`, '');

        let finalCss = '';

        for (let [path, lodRoot] of Object.entries(levelObj)) {
            // build final css (minify, etc...)
            finalCss += `\n${lodRoot.toString()}`;
        }

        // clean css
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

        // if (settings.target === 'production') {
        //     finalCss = __csso.minify(finalCss, {
        //         restructure: false,
        //         comments: true, // leave all exlamation comments /*! ... */
        //     }).css;
        // }

        // get the current css from the file if exists
        if (!currentCssByLevel[level]) {
            if (__fs.existsSync(outPath)) {
                currentCssByLevel[level] = __fs
                    .readFileSync(outPath)
                    .toString();
            } else {
                currentCssByLevel[level] = '';
            }
        }

        // replace the current css or add it to the file
        const cssFileMatchReg = new RegExp(
                `\/\\* S-LOD\:${filePathRel
                    .replace(/\//gm, '\\/')
                    .replace(
                        /\./,
                        '\\.',
                    )} \\*\/[\\w\\W]+\/\\* S-LOD-END\:${filePathRel
                    .replace(/\//gm, '\\/')
                    .replace(/\./, '\\.')} \\*\/`,
                'gm',
            ),
            cssFileMatch = currentCssByLevel[level].match(cssFileMatchReg);

        // creating the scoped css to put in the file
        const newCss = `
/* S-LOD:${filePathRel} */                
${finalCss}
/* S-LOD-END:${filePathRel} */                
`;

        // add it or replace it
        if (cssFileMatch) {
            currentCssByLevel[level] = currentCssByLevel[level].replace(
                cssFileMatch[0],
                finalCss ? newCss : '',
            );
        } else if (finalCss) {
            currentCssByLevel[level] += newCss;
        }

        // clearTimeout(_timeoutsByLevel[level]);
        // _timeoutsByLevel[level] = setTimeout(() => {
        // write file on disk
        __writeFileSync(outPath, currentCssByLevel[level]);
        const file = new __SFile(outPath);
        console.log(
            `<green>[save]</green> Lod (level of details) file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
        );
        // }, 500);
    }
}
