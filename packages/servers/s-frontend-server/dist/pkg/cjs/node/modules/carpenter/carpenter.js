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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = require("@coffeekraken/sugar/fs");
function carpenter(express, settings, config) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // handlers
        config.handlers.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            path: `${(0, fs_1.__dirname)()}/carpenterJsonHandler`,
            ettings: {},
        };
        config.handlers.carpenter = {
            description: 'Serve the carpenter page that display a component at a time',
            path: `${(0, fs_1.__dirname)()}/carpenterHandler`,
            ettings: {},
        };
        // pages
        config.pages.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            slugs: ['/carpenter.json'],
            handler: 'carpenterJson',
        };
        config.pages.carpenter = {
            description: 'Serve the carpenter page that display a component at a time',
            slugs: ['/carpenter', '/carpenter/:dotpath'],
            handler: 'carpenter',
        };
        resolve(true);
    }));
}
exports.default = carpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELCtDQUFtRDtBQUVuRCxTQUF3QixTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3ZELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELFdBQVc7UUFDWCxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRztZQUM1QixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLHVCQUF1QjtZQUMzQyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRztZQUN4QixXQUFXLEVBQ1AsNkRBQTZEO1lBQ2pFLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLG1CQUFtQjtZQUN2QyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFFRixRQUFRO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUc7WUFDekIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxLQUFLLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUc7WUFDckIsV0FBVyxFQUNQLDZEQUE2RDtZQUNqRSxLQUFLLEVBQUUsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLENBQUM7WUFDNUMsT0FBTyxFQUFFLFdBQVc7U0FDdkIsQ0FBQztRQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQS9CRCw0QkErQkMifQ==