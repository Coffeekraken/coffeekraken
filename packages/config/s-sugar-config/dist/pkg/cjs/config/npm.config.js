"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            rootDir
         * @namespace       config.npm
         * @type            String
         * @default         [config.storage.package.rootDir]/node_modules
         *
         * Specify the "node_modules" directory path
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get rootDir() {
            return `${api.config.storage.package.rootDir}/node_modules`;
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxlQUFlLENBQUM7UUFDaEUsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBbkJELDRCQW1CQyJ9