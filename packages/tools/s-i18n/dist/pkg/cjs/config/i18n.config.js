"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        extract: {
            /**
             * @name            glob
             * @type            String
             * @namespace       config.i18n.extract
             * @default         ** /*.+(ts|tsx)
             *
             * Specify a glob relative to the cwd from there to extract __i18n statements in your codebase
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get glob() {
                return `${api.config.storage.src.rootDir}/**/*.+(ts|tsx)`;
            },
            /**
             * @name            outDir
             * @type            String
             * @namespace       config.i18n.extract
             * @default         api.config.storage.src.i18nDir;
             *
             * Specify the output directory path where the i18n files will be stored
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get outDir() {
                return api.config.storage.src.i18nDir;
            },
            /**
             * @name            filename
             * @type            String
             * @namespace       config.i18n.extract
             * @default         extracted.i18n.json
             *
             * Specify the filename for the extracted json
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fileName: 'extracted.i18n.json',
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksSUFBSTtnQkFDSixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8saUJBQWlCLENBQUM7WUFDOUQsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE1BQU07Z0JBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQzFDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsUUFBUSxFQUFFLHFCQUFxQjtTQUNsQztLQUNKLENBQUM7QUFDTixDQUFDO0FBakRELDRCQWlEQyJ9