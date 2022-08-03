"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getTranslateProperties_1 = __importDefault(require("../style/getTranslateProperties"));
describe('sugar.js.dom.getTranslateProperties', () => {
    document.body.innerHTML = `
    <style>
      #testing-matrix {
        transform: matrix(1.00,0.00,0.00,1.00,10,20);
      }
      #testing-matrix3d {
        transform: matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,10,20,30,1);
      }
      #testing-translate3d {
        transform: translate3d(12px, 50%, 3em);
      }
      #testing-translate {
        transform: translate(20px, 2rem);
      }
      #testing-default {
        transform: translateX(3rem) translateY(10px) translateZ(20%);
      }
      </style>
      <div id="testing-matrix">
      </div>
      <div id="testing-matrix3d">
      </div>
      <div id="testing-translate3d">
      </div>
      <div id="testing-translate">
      </div>
      <div id="testing-default">
      </div>
  `;
    const $elmMatrix = document.querySelector('#testing-matrix');
    const $elmMatrix3d = document.querySelector('#testing-matrix3d');
    const $elmtranslate3d = document.querySelector('#testing-translate3d');
    const $elmTranslate = document.querySelector('#testing-translate');
    const $elmDefault = document.querySelector('#testing-default');
    it('Should get the translate properties from a matrix css declaration', () => {
        const translate = (0, getTranslateProperties_1.default)($elmMatrix);
        expect(translate).toEqual({
            x: 10,
            y: 20,
            z: 0
        });
    });
    it('Should get the translate properties from a matrix3d css declaration', () => {
        const translate = (0, getTranslateProperties_1.default)($elmMatrix3d);
        expect(translate).toEqual({
            x: 10,
            y: 20,
            z: 30
        });
    });
    it('Should get the translate properties from a translate3d css declaration', () => {
        const translate = (0, getTranslateProperties_1.default)($elmtranslate3d);
        expect(translate).toEqual({
            x: 12,
            y: '50%',
            z: 48
        });
    });
    it('Should get the translate properties from a translate css declaration', () => {
        const translate = (0, getTranslateProperties_1.default)($elmTranslate);
        expect(translate).toEqual({
            x: 20,
            y: 32,
            z: 0
        });
    });
    it('Should get the translate properties from a default translateX, translateY and translateZ css declaration', () => {
        const translate = (0, getTranslateProperties_1.default)($elmDefault);
        expect(translate).toEqual({
            x: 48,
            y: 10,
            z: '20%'
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkZBQXVFO0FBRXZFLFFBQVEsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLEVBQUU7SUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0QnpCLENBQUM7SUFDRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDN0QsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN2RSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbkUsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRS9ELEVBQUUsQ0FBQyxtRUFBbUUsRUFBRSxHQUFHLEVBQUU7UUFDM0UsTUFBTSxTQUFTLEdBQUcsSUFBQSxnQ0FBd0IsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFFQUFxRSxFQUFFLEdBQUcsRUFBRTtRQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFBLGdDQUF3QixFQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1NBQ04sQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0VBQXdFLEVBQUUsR0FBRyxFQUFFO1FBQ2hGLE1BQU0sU0FBUyxHQUFHLElBQUEsZ0NBQXdCLEVBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLEVBQUU7U0FDTixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSxHQUFHLEVBQUU7UUFDOUUsTUFBTSxTQUFTLEdBQUcsSUFBQSxnQ0FBd0IsRUFBQyxhQUFhLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBHQUEwRyxFQUFFLEdBQUcsRUFBRTtRQUNsSCxNQUFNLFNBQVMsR0FBRyxJQUFBLGdDQUF3QixFQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxLQUFLO1NBQ1QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9