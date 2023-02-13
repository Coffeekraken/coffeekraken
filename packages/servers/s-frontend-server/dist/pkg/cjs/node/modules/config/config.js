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
function config({ express, settings, config }) {
    return __awaiter(this, void 0, void 0, function* () {
        config.middlewares.config = {
            description: 'Middleware that inject a "config" and a "configFiles" object for the views',
            path: `${(0, fs_1.__dirname)()}/configMiddleware`,
            settings: {},
        };
        return true;
    });
}
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW1EO0FBRW5ELFNBQThCLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFOztRQUM5RCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRztZQUN4QixXQUFXLEVBQ1AsNEVBQTRFO1lBQ2hGLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLG1CQUFtQjtZQUN2QyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUE7QUFURCx5QkFTQyJ9