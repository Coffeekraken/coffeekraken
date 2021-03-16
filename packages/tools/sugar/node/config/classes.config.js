"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    generate: {
        /**
         * @name          scope
         * @namespace     config.classes.generate
         * @type          String
         * @default       ['all']
         *
         * Specify a scope that you want to generate. Usually can be either "bare", "style" or "all"
         * but these choices are not fixed and some "components" can expose more scopes
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        scope: ['all'],
        /**
         * @name          prefix
         * @namespace     config.classes.generate
         * @type          String
         * @default       null
         *
         * Specify a prefix that will be applied on every classes that
         * are defined using the ```Sugar.$(...)``` function
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        prefix: '[config.scope.prefix]',
        /**
         * @name          namespace
         * @namespace     config.classes.generate
         * @type          Array<String>
         * @default       ['sugar']
         *
         * Specify which classes registered with the "Sugar.register-class" mixin
         * you want to be present in your final css file
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        namespace: ['sugar'],
        /**
         * @name          icons
         * @namespace     config.classes.generate
         * @type          Array<String>
         * @default       ''
         *
         * Specify which icons you want to be generated as a class ```.icon-{name}```.
         * By default no classes are generated like that but you can have them using these options:
         * 1. Using the ```@include Sugar.icon(fa-user);``` mixin
         * 2. Adding the icons you want in this setting options like for example ```["fa-user", "fa-star"]``` and then use the generated classes like ```.icon-fa-user``` and ```.icon-fa-star```
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        icons: ['fa-user', 'fa-star']
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NsYXNzZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixRQUFRLEVBQUU7UUFDUjs7Ozs7Ozs7Ozs7V0FXRztRQUNILEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztRQUVkOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsTUFBTSxFQUFFLHVCQUF1QjtRQUUvQjs7Ozs7Ozs7Ozs7V0FXRztRQUNILFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUVwQjs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztLQUM5QjtDQUNGLENBQUMifQ==