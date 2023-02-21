// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __SClassmapBase from '../shared/SClassmap';
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
        // read the docmap file if no map is provided
        // in the settings
        if (!this.settings.map && this.settings.path) {
            this.read();
        }
    }
    /**
     * @name      read
     * @type        Function
     *
     * This method simply load the classmap.json file at the root of your project
     *
     * @return      {Object}               The classmap json
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    read() {
        if (!__fs.existsSync(this.settings.path)) {
            return this.map;
        }
        this.map = JSON.parse(__fs.readFileSync(this.settings.path));
        return this.map;
    }
    /**
     * @name      save
     * @type        Function
     *
     * This method simply save the classmap.json file at the root of your project
     *
     * @return      {Promise<Object>}               The classmap json
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    save() {
        if (!this.settings.path) {
            throw new Error(`<red>[SClassmap]</red> To save your classmap.json file, you MUST specify a settings.path`);
        }
        __fs.writeFileSync(this.settings.path, JSON.stringify(this.map, null, 4));
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
            map[name] = `s${Object.keys(map).length}`;
            return map[name];
        }
        if (!(map === null || map === void 0 ? void 0 : map['s-lod--0'])) {
            map['s-lod--0'] = 's0';
            map['s-lod--1'] = 's1';
            map['s-lod--2'] = 's2';
            map['s-lod--3'] = 's3';
            map['s-lod--4'] = 's4';
            map['s-lod--5'] = 's5';
            map['s-lod--6'] = 's6';
            map['s-lod--7'] = 's7';
            map['s-lod--8'] = 's8';
            map['s-lod--9'] = 's9';
            map['s-lod--10'] = 's10';
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUcxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxlQUFlLE1BQU0scUJBQXFCLENBQUM7QUFpQ2xELE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLGVBQWU7SUFDbEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEwQztRQUNsRCxLQUFLLGlCQUNELElBQUksRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUN0QyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxFQUNyQixDQUFDO1FBQ0gsNkNBQTZDO1FBQzdDLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDMUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNuQjtRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFF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