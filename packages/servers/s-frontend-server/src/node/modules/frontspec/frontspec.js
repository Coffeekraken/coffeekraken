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
export default function frontspec(express, settings, config) {
    return __awaiter(this, void 0, void 0, function* () {
        config.middlewares.frontspec = {
            path: `${__dirname()}/frontspecMiddleware`,
            settings: {},
        };
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRzcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07O1FBQzdELE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHO1lBQzNCLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxzQkFBc0I7WUFDMUMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUFBIn0=