"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAnimationProperties_1 = __importDefault(require("../getAnimationProperties"));
describe('sugar.js.dom.getAnimationProperties', () => {
    document.body.innerHTML = `
  <style>
    @keyframes coco {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    #testing {
      animation: coco 2s ease-in-out;
      animation-name: coco;
    }
  </style>
      <div id="testing">
      </div>
  `;
    const $elm = document.querySelector('#testing');
    const props = getAnimationProperties_1.default($elm);
    it('Should find the "testing" element that is up in the dom tree', () => {
        //  expect($testing.id).toBe('testing');
    });
});
