// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __toBase } from '@coffeekraken/sugar/number';
import __fs from 'fs';
import __SClassmapBase from '../shared/SClassmapBase.js';
export default class SClassmap extends __SClassmapBase {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings) {
        super(Object.assign({ path: __SSugarConfig.get('classmap.path') }, (settings !== null && settings !== void 0 ? settings : {})));
        /**
         * @name      map
         * @type        Object
         *
         * Store the actual classes map
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.map = {};
        // read the docmap file if no map is provided
        // in the settings
        if (!this.settings.map && this.settings.path) {
            this.readSync();
        }
    }
    /**
     * @name      readSync
     * @type        Function
     *
     * This method simply load the classmap.json file at the root of your project
     *
     * @return      {Object}               The classmap json
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    readSync() {
        if (!__fs.existsSync(this.settings.path)) {
            return this.map;
        }
        this.map = JSON.parse(__fs.readFileSync(this.settings.path));
        return this.map;
    }
    /**
     * @name      saveSync
     * @type        Function
     *
     * This method simply save the classmap.json file at the root of your project
     *
     * @return      {Promise<Object>}               The classmap json
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    saveSync(incremental = false) {
        var _a;
        if (!this.settings.path) {
            throw new Error(`<red>[SClassmap]</red> To save your classmap.json file, you MUST specify a settings.path`);
        }
        let mapToSave = this.map;
        if (incremental) {
            const actualMap = (_a = this.map) !== null && _a !== void 0 ? _a : {};
            let savedMap = this.readSync();
            const newMap = Object.assign(Object.assign({}, savedMap), actualMap);
            mapToSave = newMap;
        }
        __fs.writeFileSync(this.settings.path, JSON.stringify(mapToSave, null, 4));
    }
    /**
     * @name        applyOnAst
     * @type        function
     *
     * This method simply apply the classmap on an postcss AST
     *
     * @param       {Node}      node        The postcss AST node on which to apply the classmap
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    applyOnAst(node, map = this.map) {
        function getToken(name) {
            if (name.match(/(--)?s[0-9]+/)) {
                return name.replace(/^--/, '');
            }
            if (map[name]) {
                return map[name];
            }
            map[name] = `s${__toBase(Object.keys(map).length, 62)}`;
            return map[name];
        }
        // console.log(a(203));
        // // --s-color-accent-olivier
        // // --s-color-accent-tania
        // // --sab
        // if (!map?.['s-lod-0']) {
        //     map['s-lod-0'] = 's0';
        //     map['s-lod-1'] = 's1';
        //     map['s-lod-2'] = 's2';
        //     map['s-lod-3'] = 's3';
        //     map['s-lod-4'] = 's4';
        //     map['s-lod-5'] = 's5';
        //     map['s-lod-6'] = 's6';
        //     map['s-lod-7'] = 's7';
        //     map['s-lod-8'] = 's8';
        //     map['s-lod-9'] = 's9';
        //     map['s-lod-10'] = 's10';
        // }
        node.walkDecls((decl) => {
            if (decl.variable) {
                // get the variable token and replace it's prop
                const token = `--${getToken(decl.prop)}`;
                decl.prop = token;
            }
            // replace variables in value
            const varsMatches = decl.value.match(/\-\-[a-zA-Z0-9_-]+/gm);
            if (varsMatches) {
                varsMatches.forEach((varName) => {
                    const varToken = getToken(varName);
                    decl.value = decl.value.replace(varName, `--${varToken}`);
                });
            }
        });
        node.walkRules((rule) => {
            if (!rule.selectors) {
                return;
            }
            rule.selectors = rule.selectors.map((sel) => {
                sel = sel
                    .split(' ')
                    .map((part) => {
                    const classMatches = part.match(/\.[a-zA-Z0-9_-]+/gm);
                    if (classMatches) {
                        classMatches.forEach((cls) => {
                            const clsWithoutDot = cls.slice(1);
                            let clsToken = getToken(clsWithoutDot);
                            part = part.replace(cls, `.${clsToken}`);
                        });
                    }
                    return part;
                })
                    .join(' ');
                return sel;
            });
        });
        return map;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sZUFBZSxNQUFNLDRCQUE0QixDQUFDO0FBaUN6RCxNQUFNLENBQUMsT0FBTyxPQUFPLFNBQVUsU0FBUSxlQUFlO0lBWWxEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBc0M7UUFDOUMsS0FBSyxpQkFDRCxJQUFJLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFDdEMsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsRUFDckIsQ0FBQztRQXpCUDs7Ozs7Ozs7V0FRRztRQUNILFFBQUcsR0FBRyxFQUFFLENBQUM7UUFpQkwsNkNBQTZDO1FBQzdDLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0QsT0FBTyxJQUFJLENBQUMsR0FBRyxD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