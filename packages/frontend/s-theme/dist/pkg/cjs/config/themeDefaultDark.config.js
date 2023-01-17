"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Default dark',
            description: 'Nice and elegant dark theme',
        },
        /**
         * @name            colorSchema
         * @namespace        config.themeDefaultDark
         * @type            String
         * @default         [config.themeColorSchemaDark]
         *
         * Specify the color schema to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get colorSchema() {
            return api.config.themeColorSchemaDark;
        },
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3JDLEtBQUssRUFBRTtZQUNILEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSw2QkFBNkI7U0FDN0M7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxXQUFXO1lBQ1gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQzNDLENBQUM7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBdEJELDRCQXNCQyJ9