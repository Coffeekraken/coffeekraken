var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __dirname } from '@coffeekraken/sugar/fs';
export default function redirect({ express, settings, config }) {
    return __awaiter(this, void 0, void 0, function* () {
        // register handler
        config.handlers.redirect = {
            path: `${__dirname()}/redirectHandler`,
        };
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxNQUFNLENBQUMsT0FBTyxVQUFnQixRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTs7UUFDaEUsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHO1lBQ3ZCLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxrQkFBa0I7U0FDekMsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FBQSJ9