"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataset_1 = __importDefault(require("../dataset"));
describe('sugar.js.dom.dataset', () => {
    document.body.innerHTML = `
      <div id="testing" data-coco="hello"></div>
      <div id="testing1" data-plop="{hello:'coco'}"></div>
      
  `;
    const $testing = document.querySelector('#testing');
    const $testing1 = document.querySelector('#testing1');
    dataset_1.default($testing1, 'json', {
        hello: 'world'
    });
    it('Should get correctly the data-coco value from the attributes', () => {
        expect(dataset_1.default($testing, 'coco')).toBe('hello');
    });
    it('Should get correctly the data "json" value from the dataset stack', () => {
        expect(dataset_1.default($testing1, 'json')).toEqual({
            hello: 'world'
        });
    });
    it('Should get correctly the data "plop" value from the attributes', () => {
        expect(dataset_1.default($testing1, 'plop')).toEqual({
            hello: 'coco'
        });
    });
});
