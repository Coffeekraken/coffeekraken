import __SClass from '@coffeekraken/s-class';
import __SInterface from '@coffeekraken/s-interface';
import type { ISValidatorValidateResult } from '@coffeekraken/s-validator';
import __SValidator from '@coffeekraken/s-validator';
import { __parseArgs } from '@coffeekraken/sugar/cli';
import { __deepMerge, __get, __set } from '@coffeekraken/sugar/object';

/**
 * @name            SSpecs
 * @namespace       node
 * @type            Class
 * @platform        node
 * @status          beta
 *
 * This class allows you to access with ease some specification file(s) that supports internal and external references to other files, etc...
 * This is usefull to build specification files in json format that make share some parts through common files, etc...
 * You will also have easy access to your files through "namespaces" that represent different folders on your system. This will simplify
 * the way you read your files by prefixing your dotpath (simple fs "/" replacement) with the namespace you want to look in.
 *
 * @param       {Object}          [$settings={}]              Some settings to configure your instance
 *
 * @setting         {Object}            [namespaces={}]             An object of namespace like "my.namespace" property with a simple array of folders where to search for specs files when using this namespace
 * @setting         {Function}               [previewUrl=null]            A function called only when a .preview.png file exists alongside the .spec.json file that will take an object with "path", "name", "specs" and "specsObj" as input and that has to return the web accessible preview url. If not specified, no "preview" field will exists in the output spec json
 * @setting         {Boolean}           [read.metas=true]           Specify if you want to get the metas back for each spec
 * @setting         {Boolean}           [read.models=true]          Specigy if you want to get back the ".model.json" files that are alongside of the .spec.json file if exists
 *
 * @snippet          __SSpecs($1)
 * const specs = new __SSpecs($1);
 * const spec = specs.read('sugar.views.components.card');
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
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSpecsSettings {}

export interface ISSpecsValidateResult {
    valid: boolean;
    props: Record<string, ISValidatorValidateResult>;
}

export default class SSpecsBase extends __SClass {
    /**
     * @name            fromInterface
     * @type            Function
     * @status          beta
     * @static
     *
     * This method allows you to convert an SInterface class into a spec object
     *
     * @param       {SInterface}        int             The SInterface class you want to use for your spec object
     * @return      {Any}                               The requested spec object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static fromInterface(
        int: __SInterface,
        settings: Partial<ISSpecsSettings> = {},
    ): any {
        let specJson = {
            title: int.title,
            description: int.description,
            props: {},
        };

        for (let [prop, value] of Object.entries(int.definition)) {
            const repeatableStr = value.type.match(/\[\]$/)
                ? '[]'
                : value.type.match(/\{\}$/)
                ? '{}'
                : '';

            let type;
            if (value.values && value.values.length) {
                type = 'Select';
            }

            switch (value.type.toLowerCase()) {
                case 'boolean':
                    specJson.props[prop] = {
                        type: type ?? 'Checkbox',
                    };
                    break;
                case 'number':
                    specJson.props[prop] = {
                        type: type ?? 'Number',
                    };
                    break;
                case 'integer':
                    specJson.props[prop] = {
                        type: type ?? 'Integer',
                    };
                    break;
                case 'string':
                    specJson.props[prop] = {
                        type: type ?? 'Text',
                    };
                    break;
                default:
                    specJson.props[prop] = {
                        type: type ?? value.type ?? 'Text',
                    };
                    break;
            }
            specJson.props[prop] = {
                ...(specJson.props[prop] ?? {}),
                ...(value.specs ?? {}),
                type: `${specJson.props[prop].type}${repeatableStr}`,
                title: value.title,
                description: value.description,
                default: value.default,
                required: value.required,
            };

            if (type === 'Select') {
                specJson.props[prop].options = value.values.map((v) => {
                    return {
                        name: v,
                        value: v,
                    };
                });
            }
        }

        // take the "_specs" static property of the SInterface class
        // if exists
        if (int._specs) {
            specJson = __deepMerge(specJson, int._specs);
        }

        // return the new spec json
        return specJson;
    }

    static validate(values: any | string, specs: any): ISSpecsValidateResult {
        const validator = new __SValidator();

        if (typeof values === 'string') {
            values = __parseArgs(values);
        }

        const finalResult: ISSpecsValidateResult = {
            valid: true,
            props: {},
        };

        function processProps(props: any, path: string[]): any {
            for (let [prop, propObj] of Object.entries(props)) {
                if (propObj.props) {
                    processProps(propObj.props, [...path, prop, 'props']);
                } else {
                    const valuePath = [
                        ...path.filter((l) => l !== 'props'),
                        prop,
                    ];
                    const valueToValidate = __get(values, valuePath);

                    const result = validator.validate(valueToValidate, {
                        type: propObj.type,
                        ...(propObj.rules ?? {}),
                        required: propObj.required,
                    });

                    if (finalResult.valid && !result.valid) {
                        finalResult.valid = false;
                    }
                    finalResult.props[valuePath.join('.')] = result;
                }
            }
        }

        processProps(specs.props ?? {}, []);

        return finalResult;
    }

    static apply(what: string | any, spec: any): any {
        if (!spec) {
            throw new Error(
                `[SSpecs.apply] You MUST specify a valid spec object as the second parameter...`,
            );
        }

        if (typeof what === 'string') {
            what = __parseArgs(what);
        }
        const specsData = __deepMerge(this.extractDefaults(spec), what);

        return specsData;
    }

    static extractDefaults(specs: any): any {
        let defaults = {};

        function processProps(props: any, path: string[]): any {
            for (let [prop, propObj] of Object.entries(props)) {
                if (propObj.default !== undefined) {
                    __set(
                        defaults,
                        [...path, prop].filter((l) => l !== 'props'),
                        propObj.default,
                    );
                }
                if (propObj.props) {
                    processProps(propObj.props, [...path, prop, 'props']);
                }
            }
        }

        processProps(specs.props ?? {}, []);

        if (specs.default) {
            defaults = __deepMerge(defaults, specs.default);
        }

        return defaults;
    }

    /**
     * @name        constructor
     * @type        Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISSpecsSettings>) {
        super(__deepMerge({}, settings ?? {}));
    }
}
