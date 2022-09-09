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
function frontspec(express, settings, config) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW1EO0FBRW5ELFNBQThCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07O1FBQzdELE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHO1lBQzNCLFdBQVcsRUFDUCx1RkFBdUY7WUFDM0YsSUFBSSxFQUFFLEdBQUcsSUFBQSxjQUFTLEdBQUUsc0JBQXNCO1lBQzFDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FBQTtBQVRELDRCQVNDIn0=