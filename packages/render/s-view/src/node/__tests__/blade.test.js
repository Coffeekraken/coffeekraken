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
const SView_1 = __importDefault(require("../SView"));
describe('s-view.blade', () => {
    it('Should compile the passed blade view correctly', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const view = new SView_1.default('default', {
            view: {
                rootDirs: [`${__dirname}/views`]
            }
        });
        const res = yield view.render({
            title: 'Hello world'
        });
        console.log(res);
        // const result = await view.render(
        //   'default',
        //   {
        //     title: 'Hello world',
        //     settings: {}
        //   },
        //   {
        //     rootDir: __dirname + '/views'
        //   }
        // );
        // expect(result.length).toBe(256);
        done();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJsYWRlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBK0I7QUFFL0IsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDNUIsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDbEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxlQUFPLENBQUMsU0FBUyxFQUFFO1lBQ2xDLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsQ0FBQyxHQUFHLFNBQVMsUUFBUSxDQUFDO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzVCLEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsb0NBQW9DO1FBQ3BDLGVBQWU7UUFDZixNQUFNO1FBQ04sNEJBQTRCO1FBQzVCLG1CQUFtQjtRQUNuQixPQUFPO1FBQ1AsTUFBTTtRQUNOLG9DQUFvQztRQUNwQyxNQUFNO1FBQ04sS0FBSztRQUVMLG1DQUFtQztRQUNuQyxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9