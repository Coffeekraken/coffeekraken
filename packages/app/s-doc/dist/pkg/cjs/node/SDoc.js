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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const object_1 = require("@coffeekraken/sugar/object");
class SDoc extends s_class_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        var _a;
        super((0, object_1.__deepMerge)((_a = s_sugar_config_1.default.get('doc')) !== null && _a !== void 0 ? _a : {}, settings !== null && settings !== void 0 ? settings : {}));
        (() => __awaiter(this, void 0, void 0, function* () {
            this._docmap = new s_docmap_1.default();
            this._docmapJson = yield this._docmap.read();
        }))();
    }
    /**
     * @name            initOnExpressServer
     * @type            Function
     *
     * This method simply take an express app as parameter and
     * will expose some documentation enpoints like "/api/doc/...".
     * These endpoints are customizable through the .sugar/doc.config.ts file.
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    initOnExpressServer(express) {
        // base url "/"
        express.get(this.settings.endpoints.base, (req, res) => {
            res.status(200);
            res.type('application/json');
            res.send(this.settings.categories);
        });
        console.log(`<yellow>[SDoc]</yellow> Exposing doc endpoint "<cyan>${this.settings.endpoints.base}</cyan>"`);
        express.get(this.settings.endpoints.items, (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const filters = JSON.parse(decodeURIComponent(req.params.filters)), result = yield this._docmap.search(filters);
            res.status(200);
            res.type('application/json');
            res.send((_a = result.items) !== null && _a !== void 0 ? _a : {});
        }));
        console.log(`<yellow>[SDoc]</yellow> Exposing items endpoint "<cyan>${this.settings.endpoints.items}</cyan>"`);
        express.get(this.settings.endpoints.item, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const item = this._docmapJson.map[id];
            if (item) {
                const docblock = new s_docblock_1.default(item.path);
                item.docblocks = docblock.toObject();
            }
            res.status(200);
            res.type('application/json');
            res.send(item !== null && item !== void 0 ? item : {});
        }));
        console.log(`<yellow>[SDoc]</yellow> Exposing item endpoint "<cyan>${this.settings.endpoints.item}</cyan>"`);
    }
}
exports.default = SDoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFDL0Msa0ZBQTBEO0FBQzFELHVEQUF5RDtBQTJDekQsTUFBcUIsSUFBSyxTQUFRLGlCQUFRO0lBSXRDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0I7O1FBQ2hDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsTUFBQSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEUsQ0FBQyxHQUFTLEVBQUU7WUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0JBQVMsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pELENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsbUJBQW1CLENBQUMsT0FBWTtRQUM1QixlQUFlO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FDUCx3REFBd0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLENBQ2pHLENBQUM7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTs7WUFDMUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQzlELE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBQSxNQUFNLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FDUCwwREFBMEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxVQUFVLENBQ3BHLENBQUM7UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN6RCxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUV6QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxJQUFJLElBQUksRUFBRTtnQkFDTixNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN4QztZQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFKLElBQUksY0FBSixJQUFJLEdBQUksRUFBRSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQ1AseURBQXlELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxDQUNsRyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekVELHVCQXlFQyJ9