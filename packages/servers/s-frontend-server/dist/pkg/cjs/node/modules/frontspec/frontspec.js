"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
function frontspec({ express, settings, config }) {
    return __awaiter(this, void 0, void 0, function* () {
        config.middlewares.frontspec = {
            description: 'Gives access to a "frontspec" object in the "res.templateData" passed to the template',
            path: `${(0, fs_1.__dirname)()}/frontspecMiddleware`,
            settings: {},
        };
        return true;
    });
}
exports.default = frontspec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW1EO0FBRW5ELFNBQThCLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFOztRQUNqRSxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRztZQUMzQixXQUFXLEVBQ1AsdUZBQXVGO1lBQzNGLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLHNCQUFzQjtZQUMxQyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUE7QUFURCw0QkFTQyJ9