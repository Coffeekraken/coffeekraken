var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function dynamic(express, settings, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // register handler
        config.handlers.dynamic = {
            description: 'Generic handler that make use of the "views" property of your page config to render them using the SViewRenderer',
            path: `${__dirname()}/dynamicHandler`,
        };
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07O1FBQzNELG1CQUFtQjtRQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRztZQUN0QixXQUFXLEVBQ1Asa0hBQWtIO1lBQ3RILElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxpQkFBaUI7U0FDeEMsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FBQSJ9