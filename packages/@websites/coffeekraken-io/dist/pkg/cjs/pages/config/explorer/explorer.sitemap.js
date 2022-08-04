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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const path_1 = __importDefault(require("path"));
function apiSitemap() {
    return new s_promise_1.default(({ resolve, emit }) => __awaiter(this, void 0, void 0, function* () {
        const items = [
            {
                loc: "/config/explorer",
            },
        ];
        const configIds = [];
        s_sugar_config_1.default.filesPaths.forEach((filePath) => {
            const fileName = path_1.default.basename(filePath), configId = fileName.replace(/\.config\.js/, "");
            if (configIds.includes(configId))
                return;
            configIds.push(configId);
            items.push({
                title: `${configId}.config.ts`,
                loc: `/config/explorer/${configId}`,
            });
        });
        resolve(items);
    }));
}
exports.default = apiSitemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsd0VBQWlEO0FBSWpELGtGQUEwRDtBQUMxRCxnREFBMEI7QUFFMUIsU0FBd0IsVUFBVTtJQUNoQyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxLQUFLLEdBQWlDO1lBQzFDO2dCQUNFLEdBQUcsRUFBRSxrQkFBa0I7YUFDeEI7U0FDRixDQUFDO1FBRUYsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO1FBRS9CLHdCQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzdDLE1BQU0sUUFBUSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQ3hDLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU87WUFDekMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNULEtBQUssRUFBRSxHQUFHLFFBQVEsWUFBWTtnQkFDOUIsR0FBRyxFQUFFLG9CQUFvQixRQUFRLEVBQUU7YUFDcEMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUM7QUF2QkQsNkJBdUJDIn0=