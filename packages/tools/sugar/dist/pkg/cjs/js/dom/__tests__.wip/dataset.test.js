"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataset_1 = __importDefault(require("../data/dataset"));
describe('sugar.js.dom.dataset', () => {
    document.body.innerHTML = `
      <div id="testing" data-coco="hello"></div>
      <div id="testing1" data-plop="{hello:'coco'}"></div>
      
  `;
    const $testing = document.querySelector('#testing');
    const $testing1 = document.querySelector('#testing1');
    (0, dataset_1.default)($testing1, 'json', {
        hello: 'world'
    });
    it('Should get correctly the data-coco value from the attributes', () => {
        expect((0, dataset_1.default)($testing, 'coco')).toBe('hello');
    });
    it('Should get correctly the data "json" value from the dataset stack', () => {
        expect((0, dataset_1.default)($testing1, 'json')).toEqual({
            hello: 'world'
        });
    });
    it('Should get correctly the data "plop" value from the attributes', () => {
        expect((0, dataset_1.default)($testing1, 'plop')).toEqual({
            hello: 'coco'
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXdDO0FBRXhDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7Ozs7R0FJekIsQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV0RCxJQUFBLGlCQUFTLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRTtRQUMzQixLQUFLLEVBQUUsT0FBTztLQUNmLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4REFBOEQsRUFBRSxHQUFHLEVBQUU7UUFDdEUsTUFBTSxDQUFDLElBQUEsaUJBQVMsRUFBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsbUVBQW1FLEVBQUUsR0FBRyxFQUFFO1FBQzNFLE1BQU0sQ0FBQyxJQUFBLGlCQUFTLEVBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzNDLEtBQUssRUFBRSxPQUFPO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsZ0VBQWdFLEVBQUUsR0FBRyxFQUFFO1FBQ3hFLE1BQU0sQ0FBQyxJQUFBLGlCQUFTLEVBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzNDLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9