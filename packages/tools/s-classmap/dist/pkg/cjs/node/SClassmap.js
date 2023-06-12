"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const number_1 = require("@coffeekraken/sugar/number");
const fs_1 = __importDefault(require("fs"));
const SClassmapBase_1 = __importDefault(require("../shared/SClassmapBase"));
class SClassmap extends SClassmapBase_1.default {
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
        super(Object.assign({ path: s_sugar_config_1.default.get('classmap.path') }, (settings !== null && settings !== void 0 ? settings : {})));
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
        if (!fs_1.default.existsSync(this.settings.path)) {
            return this.map;
        }
        this.map = JSON.parse(fs_1.default.readFileSync(this.settings.path));
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
        fs_1.default.writeFileSync(this.settings.path, JSON.stringify(mapToSave, null, 4));
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
            map[name] = `s${(0, number_1.__toBase)(Object.keys(map).length, 62)}`;
            return map[name];
        }
        // console.log(a(203));
        // // --s-color-accent-olivier
        // // --s-color-accent-tania
        // // --sab
        // if (!map?.['s-lod--0']) {
        //     map['s-lod--0'] = 's0';
        //     map['s-lod--1'] = 's1';
        //     map['s-lod--2'] = 's2';
        //     map['s-lod--3'] = 's3';
        //     map['s-lod--4'] = 's4';
        //     map['s-lod--5'] = 's5';
        //     map['s-lod--6'] = 's6';
        //     map['s-lod--7'] = 's7';
        //     map['s-lod--8'] = 's8';
        //     map['s-lod--9'] = 's9';
        //     map['s-lod--10'] = 's10';
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
exports.default = SClassmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUEwRDtBQUcxRCx1REFBc0Q7QUFFdEQsNENBQXNCO0FBQ3RCLDRFQUFzRDtBQWlDdEQsTUFBcUIsU0FBVSxTQUFRLHVCQUFlO0lBWWxEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBc0M7UUFDOUMsS0FBSyxpQkFDRCxJQUFJLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQ3RDLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLEVBQ3JCLENBQUM7UUF6QlA7Ozs7Ozs7O1dBUUc7UUFDSCxRQUFHLEdBQUcsRUFBRSxDQUFDO1FBaUJMLDZDQUE2QztRQUM3QyxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQzFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsQ0FBQyxXQUFXLEdBQUcsS0FBSzs7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFR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