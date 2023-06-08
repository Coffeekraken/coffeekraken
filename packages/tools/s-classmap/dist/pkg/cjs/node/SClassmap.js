"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const number_1 = require("@coffeekraken/sugar/number");
const fs_1 = __importDefault(require("fs"));
const SClassmap_1 = __importDefault(require("../shared/SClassmap"));
class SClassmap extends SClassmap_1.default {
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
        // read the docmap file if no map is provided
        // in the settings
        if (!this.settings.map && this.settings.path) {
            this.read();
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
    saveSync() {
        if (!this.settings.path) {
            throw new Error(`<red>[SClassmap]</red> To save your classmap.json file, you MUST specify a settings.path`);
        }
        fs_1.default.writeFileSync(this.settings.path, JSON.stringify(this.map, null, 4));
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
            map[name] = (0, number_1.__toBase)(Object.keys(map).length, 62);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUEwRDtBQUcxRCx1REFBc0Q7QUFFdEQsNENBQXNCO0FBQ3RCLG9FQUFrRDtBQWlDbEQsTUFBcUIsU0FBVSxTQUFRLG1CQUFlO0lBQ2xEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBMEM7UUFDbEQsS0FBSyxpQkFDRCxJQUFJLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQ3RDLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLEVBQ3JCLENBQUM7UUFDSCw2Q0FBNkM7UUFDN0Msa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUMxQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FDWCwwRkFBMEYsQ0FDN0YsQ0FBQztTQUNMO1FB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