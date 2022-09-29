import __SClass from '@coffeekraken/s-class';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMap, __deepMerge, __get } from '@coffeekraken/sugar/object';
import __fs from 'fs';

/**
 * @name            SSpecs
 * @namespace       php
 * @type            Class
 * @platform        node
 * @status          beta
 *
 * This class allows you to access with ease some specification file(s) that supports internal and external references to other files, etc...
 * This is usefull to build specification files in json format that make share some parts through common files, etc...
 * You will also have easy access to your files through "namespaces" that represent different folders on your system. This will simplify
 * the way you read your files by prefixing your dotpath (simple fs "/" replacement) with the namespace you want to look in.
 *
 * @example         js
 * import __SSpecs from '@coffeekraken/s-specs';
 * const spec = new __SSpecs({
 *   namespaces: {
 *      myNamespace: [
 *          '/my/absolute/path/to/my/specs/directory'
 *      ]
 *   }
 * });
 *
 * // read a spec file
 * const viewSpec = spec.read('myNamespace.views.mySpecFile');
 *
 * // read a spec file and specify an internal property to get
 * const title = spec.read('myNamespace.views.mySpecFile:title);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSpecsSettings {
    namespaces: Record<string, string[]>;
}

export default class SSpecs extends __SClass {
    constructor(settings: Partial<ISSpecsSettings>) {
        super(__deepMerge(__SSugarConfig.get('specs') ?? {}, settings ?? {}));
        if (!this.settings.namespaces) {
            throw new Error(
                '[SSpecs] You MUST at least specify some "namespaces" folders to search specs files in...',
            );
        }
    }

    /**
     * @name            read
     * @type            Function
     * @status          beta
     *
     * This method allows you to read a spec file and/or a value inside the passed spec file.
     *
     * @param       {String}        specDotPath        A dotpath that point to a json spec file relative to one of the registered "$settings.namespaces" folders. You can then specify an internal dotpath to get a specific value inside the passed file like so "sugar.views.props.attributes:title"
     * @return      {Any}                               The requested spec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(specDotPath) {
        let finalValue;

        let definedNamespaces = this.settings.namespaces;
        let definesNamespacesKeys = Object.keys(definedNamespaces);

        let currentNamespace = '';
        for (let i = 0; i < definesNamespacesKeys.length; i++) {
            const namespace = definesNamespacesKeys[i];
            if (specDotPath.startsWith(namespace)) {
                currentNamespace = namespace;
                break;
            }
        }

        if (!currentNamespace) {
            throw new Error(
                `[SSpecs.read] The passed dotpath ${specDotPath}" does not correspond to any registered namespaces which are: ${definesNamespacesKeys.join(
                    '\n',
                )}`,
            );
        }

        let dotPathParts = specDotPath.split(':');

        let specFileDotPath = dotPathParts[0],
            internalSpecDotPath;
        if (dotPathParts[1]) {
            internalSpecDotPath = dotPathParts[1];
        }

        // compute internal namespace dotpath
        let internalDotPath = specFileDotPath.replace(
            `${currentNamespace}.`,
            '',
        );
        let internalPath = `${internalDotPath.split('.').join('/')}.spec.json`;

        let finalSpecFilePath;

        // loop on each registered namespaces directories to check if the specDotPath
        // correspond to a file in one of them...
        const dirs = this.settings.namespaces[currentNamespace];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];

            // direct path my/path => my/path.spec.json
            let potentialSpecPath = `${dir}/${internalPath}`;

            if (__fs.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }

            // try from my/path => my/path/path.spec.json
            const parts = internalDotPath.split('.'),
                lastDotPart = parts[parts.length - 1];

            potentialSpecPath = `${dir}/${internalPath.replace(
                '.spec.json',
                `/${lastDotPart}.spec.json`,
            )}`;

            if (__fs.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }
        }

        if (!finalSpecFilePath) {
            throw new Error(
                `[SSpecs] The requested dotpath spec "${specDotPath}" does not resolve to any existing spec file...`,
            );
        }

        // read the spec file
        let specJson = JSON.parse(
            __fs.readFileSync(finalSpecFilePath).toString(),
        );

        // traverse each values to resolve them if needed
        specJson = __deepMap(specJson, ({ object, prop, value, path }) => {
            return this.resolve(value, specJson);
        });

        // check if the spec extends another
        if (specJson.extends) {
            let extendsJson = this.read(specJson.extends);
            specJson = __deepMerge(extendsJson, specJson);
            delete specJson.extends;
        }

        // if we have an internal spec dotpath
        if (internalSpecDotPath) {
            return __get(specJson, internalSpecDotPath);
        }

        // return the getted specJson
        return specJson;
    }

    /**
     * This method take a value (string, boolean, etc...) and try to resolve it
     * if it is something like "@this.props...", or "@sugar.views...", etc...
     */
    resolve(value, specJson) {
        let newValue = value;

        if (typeof value === 'string') {
            if (value.startsWith('@this')) {
                let internalDotPath = value.replace('@this', '');
                newValue = __get(specJson, internalDotPath);
                if (Array.isArray(newValue) || __isPlainObject(newValue)) {
                    newValue = __deepMap(newValue, ({ value: v }) => {
                        return this.resolve(v, newValue);
                    });
                }
            } else if (value.startsWith('@')) {
                const dotPath = value.replace('@', ''),
                    spec = this.read(dotPath);
                newValue = spec;
            }
        }
        return newValue;
    }
}
