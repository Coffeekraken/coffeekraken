// import __postcss from 'postcss';
import __SBench from '@coffeekraken/s-bench';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __STheme from '@coffeekraken/s-theme';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __postcss from 'postcss';
import __getRoot from './utils/getRoot';

let _mixinsPaths;
const plugin = (settings: any = {}) => {
    settings = __deepMerge(
        {
            inlineImport: true,
        },
        settings,
    );

    // load all the styles

    // const stylesPaths = __glob.sync(`${__dirname}/**/*.style.css`);
    // const stylesCss: string[] = [];
    // stylesPaths.forEach((path) => {
    //   stylesCss.push(__fs.readFileSync(path, 'utf8').toString());
    // });

    function findUp(node, checker) {
        const res = checker(node);
        if (!res && node.parent) return findUp(node.parent, checker);
        else if (res) return res;
        return;
    }

    function applyNoScopes(scopes: string[], fromNode): string[] {
        const noScopeRule = findUp(fromNode, (node) => {
            if (node?.name === 'sugar.scope.no') return node;
            return;
        });
        if (noScopeRule && noScopeRule.params) {
            const noScopes = noScopeRule.params
                .trim()
                .replace(/^\(/, '')
                .replace(/\)$/, '')
                .split(/[,\s]/)
                .map((l) => l.trim());

            const newScopes = scopes.filter((scope) => {
                return noScopes.indexOf(scope) === -1;
            });
            return newScopes;
        }
        return scopes;
    }

    function replaceWith(atRule, nodes) {
        nodes = Array.from(nodes);

        let isAllText = true;
        nodes.forEach((n) => {
            if (!isAllText) return;
            if (typeof n !== 'string') isAllText = false;
        });
        if (isAllText) nodes = [nodes.join('\n')];

        if (atRule.parent) {
            let finalNodes: any[] = [];

            nodes
                .map((n) => (typeof n === 'string' ? n.trim() : n))
                .forEach((n) => {
                    if (typeof n === 'string') {
                        finalNodes = [
                            ...finalNodes,
                            ...(__postcss.parse(n).nodes ?? []),
                        ];
                    } else {
                        finalNodes.push(n);
                    }
                });

            for (const node of finalNodes.reverse()) {
                if (!node) continue;
                atRule.parent.insertAfter(atRule, node);
            }
        }
        atRule.remove();
    }

    const sharedData = {
        noScopes: [],
    };
    const mixinsStack = {},
        functionsStack = {},
        postProcessorsRegisteredFn: Function[] = [];

    async function _loadFolder(folderPath, type: 'mixins' | 'functions') {
        const paths = __glob.sync(`${folderPath}/**/*.js`, {
            // cwd: __dirname(),
            cwd: '',
        });
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const { default: fn, interface: int } = await import(`${path}`);
            if (type === 'mixins') {
                mixinsStack[
                    `${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`
                ] = {
                    mixin: fn,
                    interface: int,
                };
                mixinsStack[
                    `${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`
                ] = {
                    mixin: fn,
                    interface: int,
                };
            } else {
                functionsStack[
                    `${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`
                ] = {
                    fn,
                    interface: int,
                };
                functionsStack[
                    `${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`
                ] = {
                    fn,
                    interface: int,
                };
            }
        }
    }

    async function _load() {
        // func sugar json
        const sugarJsonInstance = new __SSugarJson();
        const sugarJson = await sugarJsonInstance.read();

        for (let i = 0; i < Object.keys(sugarJson).length; i++) {
            const packageName = Object.keys(sugarJson)[i];

            const packageSugarJson = sugarJson[packageName];
            if (!packageSugarJson.postcss) continue;

            // mixins loading
            const mixinsFolders =
                packageSugarJson.postcss.folders?.mixins ?? [];
            for (let j = 0; j < mixinsFolders.length; j++) {
                const folderObj = mixinsFolders[j];

                if (!folderObj.path) continue;
                const finalPath = __path.resolve(
                    packageSugarJson.metas.folderPath,
                    folderObj.path,
                );

                await _loadFolder(finalPath, 'mixins');
            }

            // functions loading
            const functionsFolders =
                packageSugarJson.postcss.folders?.functions ?? [];
            for (let j = 0; j < functionsFolders.length; j++) {
                const folderObj = functionsFolders[j];

                if (!folderObj.path) continue;
                const finalPath = __path.resolve(
                    packageSugarJson.metas.folderPath,
                    folderObj.path,
                );

                await _loadFolder(finalPath, 'functions');
            }
        }

        // list all mixins
        await _loadFolder(`${__dirname()}/mixins`, 'mixins');

        // list all functions
        await _loadFolder(`${__dirname()}/functions`, 'functions');

        return true;
    }

    return {
        postcssPlugin: 'sugar',
        async Once() {
            if (__SBench.env.isBenchActive('postcssSugarPlugin')) {
                __SBench.start('postcssSugarPlugin');
            }

            await _load();
        },

        async OnceExit(root) {
            for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
                const fn = postProcessorsRegisteredFn[i];
                await fn();
            }

            const postProcessorsPaths = __glob.sync('**/*.js', {
                cwd: `${__dirname()}/postProcessors`,
            });

            for (let i = 0; i < postProcessorsPaths.length; i++) {
                const path = postProcessorsPaths[i];
                const { default: processorFn } = await import(
                    `${__dirname()}/postProcessors/${path}`
                );
                await processorFn({
                    root,
                    sharedData,
                });
            }

            if (__SBench.env.isBenchActive('postcssSugarPlugin')) {
                console.log(__SBench.end('postcssSugarPlugin').toString());
            }
        },
        AtRule(atRule, postcssApi) {
            if (atRule.name.match(/^sugar\./)) {
                let mixinId = atRule.name.replace(/^sugar\./, '');

                if (!mixinsStack[mixinId]) {
                    mixinId = `${mixinId}.${mixinId.split('.').slice(-1)[0]}`;
                }

                if (!mixinsStack[mixinId]) {
                    throw new Error(
                        `<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`,
                    );
                }

                const root = __getRoot(atRule);
                const sourcePath =
                    typeof root.source.input.file === 'string'
                        ? __path.dirname(root.source.input.file)
                        : __dirname();

                const mixinFn = mixinsStack[mixinId].mixin;
                const mixinInterface = mixinsStack[mixinId].interface;

                const sanitizedParams = atRule.params;

                const params = mixinInterface.apply(sanitizedParams, {});

                delete params.help;
                mixinFn({
                    params,
                    atRule,
                    findUp,
                    applyNoScopes(scopes = []) {
                        return applyNoScopes(scopes, atRule);
                    },
                    replaceWith(nodes) {
                        replaceWith(atRule, nodes);
                    },
                    atRootStart(css) {
                        const root = __getRoot(atRule);
                        root.prepend(css);
                    },
                    atRootEnd(css) {
                        const root = __getRoot(atRule);
                        root.append(css);
                    },
                    postcssApi,
                    sourcePath,
                    sharedData,
                    registerPostProcessor(fn: Function) {
                        postProcessorsRegisteredFn.push(fn);
                    },
                    postcss: __postcss,
                    settings,
                });
            } else if (atRule.name.match(/^import/)) {
                // check settings
                if (!settings.inlineImport) return;

                // do not take care of imported assets using url('...');
                if (atRule.params.match(/^url\(/)) return;

                const dirName =
                    typeof atRule.source.input.file === 'string'
                        ? __path.dirname(atRule.source.input.file)
                        : __dirname();

                const path = __path.resolve(dirName, __unquote(atRule.params));

                if (!__fs.existsSync(path)) {
                    throw new Error(
                        `<red>[postcssSugarPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`,
                    );
                }

                const contentStr = __fs.readFileSync(path, 'utf8').toString();

                atRule.after(contentStr);
                atRule.remove();
            }
        },
        Declaration(decl) {
            if (!decl.prop || !decl.value) return;
            if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/)) return;
            const calls = decl.value.match(
                /sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm,
            );

            if (!calls || !calls.length) return;
            calls.forEach((sugarStatement) => {
                // FIX. sugarStatement comes with none corresponding count of "(" and ")"
                const openingParenthesisCount = (
                    sugarStatement.match(/\(/g) || []
                ).length;
                const closingParenthesisCount = (
                    sugarStatement.match(/\)/g) || []
                ).length;

                if (openingParenthesisCount > closingParenthesisCount) {
                    sugarStatement += ')'.repeat(
                        openingParenthesisCount - closingParenthesisCount,
                    );
                }

                const functionName = sugarStatement.match(
                    /sugar\.([a-zA-Z0-9\.]+)/,
                )[1];
                const paramsStatement = sugarStatement.replace(
                    /sugar\.[a-zA-Z0-9\.]+/,
                    '',
                );

                let fnId = functionName;
                if (!functionsStack[fnId]) {
                    fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`;
                }

                if (!functionsStack[fnId]) {
                    throw new Error(
                        `<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`,
                    );
                }

                const functionInterface = functionsStack[fnId].interface;
                const funcFn = functionsStack[fnId].fn;
                const params = functionInterface.apply(paramsStatement, {});
                delete params.help;

                try {
                    const result = funcFn({
                        params,
                        settings,
                    });
                    decl.value = decl.value.replace(sugarStatement, result);
                } catch (e) {
                    console.error(e.message);
                }
            });
        },
    };
};
plugin.postcss = true;
export const postcss = true;
export default plugin;
