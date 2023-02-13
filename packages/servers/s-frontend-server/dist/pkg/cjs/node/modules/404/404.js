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
function dynamic({ express, settings, config }) {
    return __awaiter(this, void 0, void 0, function* () {
        // register handler
        config.handlers['404'] = {
            description: 'Handle the 404 page',
            path: `${(0, fs_1.__dirname)()}/404Handler`,
            settings: {},
        };
        return true;
    });
}
exports.default = dynamic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW1EO0FBRW5ELFNBQThCLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFOztRQUMvRCxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRztZQUNyQixXQUFXLEVBQUUscUJBQXFCO1lBQ2xDLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLGFBQWE7WUFDakMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUFBO0FBVEQsMEJBU0MifQ==