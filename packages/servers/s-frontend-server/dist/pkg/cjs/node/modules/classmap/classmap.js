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
function classmap({ express, settings, config }) {
    return __awaiter(this, void 0, void 0, function* () {
        // handlers
        config.handlers.classmapJson = {
            description: 'Load and serve the classmap.json file',
            path: `${(0, fs_1.__dirname)()}/classmapJsonHandler`,
            ettings: {},
        };
        // pages
        config.pages.classmapJson = {
            description: 'Serve the classmap.json',
            slugs: ['/classmap.json'],
            handler: 'classmapJson',
        };
        return true;
    });
}
exports.default = classmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW1EO0FBRW5ELFNBQThCLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFOztRQUNoRSxXQUFXO1FBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUc7WUFDM0IsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSxzQkFBc0I7WUFDMUMsT0FBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBRUYsUUFBUTtRQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHO1lBQ3hCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7WUFDekIsT0FBTyxFQUFFLGNBQWM7U0FDMUIsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FBQTtBQWhCRCwyQkFnQkMifQ==