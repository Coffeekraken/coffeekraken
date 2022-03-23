var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/path/packageRoot", "@coffeekraken/sugar/node/fs/dirname"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name           classesMap
             * @namespace       config.sFile
             * @type            Record<string, string>
             * @default         {}
             *
             * Map some SFile classes path using minimatch patterns like so:
             * {
             *   '*.scss,*.sass': `${__packageRoot(__dirname)}/src/node/scss/SScssFile`
             * }
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            classesMap: {
                'tsconfig.*': `${(0, packageRoot_1.default)((0, dirname_1.default)())}/src/node/ts/STsconfigFile`,
                '*.js,*.jsx': `${(0, packageRoot_1.default)((0, dirname_1.default)())}/src/node/js/SJsFile`,
                '*.ts,*.tsx': `${(0, packageRoot_1.default)((0, dirname_1.default)())}/src/node/typescript/STsFile`,
                '*.scss,*.sass': `${(0, packageRoot_1.default)((0, dirname_1.default)())}/src/node/scss/SScssFile`,
                '*.svelte': `${(0, packageRoot_1.default)((0, dirname_1.default)())}/src/node/svelte/SSvelteFile`,
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic0ZpbGUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic0ZpbGUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNEZBQXNFO0lBQ3RFLGtGQUE0RDtJQUc1RCxtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBQ3BDLE9BQU87WUFDSDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsVUFBVSxFQUFFO2dCQUNSLFlBQVksRUFBRSxHQUFHLElBQUEscUJBQWEsRUFDMUIsSUFBQSxpQkFBUyxHQUFFLENBQ2QsNEJBQTRCO2dCQUM3QixZQUFZLEVBQUUsR0FBRyxJQUFBLHFCQUFhLEVBQUMsSUFBQSxpQkFBUyxHQUFFLENBQUMsc0JBQXNCO2dCQUNqRSxZQUFZLEVBQUUsR0FBRyxJQUFBLHFCQUFhLEVBQzFCLElBQUEsaUJBQVMsR0FBRSxDQUNkLDhCQUE4QjtnQkFDL0IsZUFBZSxFQUFFLEdBQUcsSUFBQSxxQkFBYSxFQUM3QixJQUFBLGlCQUFTLEdBQUUsQ0FDZCwwQkFBMEI7Z0JBQzNCLFVBQVUsRUFBRSxHQUFHLElBQUEscUJBQWEsRUFDeEIsSUFBQSxpQkFBUyxHQUFFLENBQ2QsOEJBQThCO2FBQ2xDO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFqQ0QsNEJBaUNDIn0=