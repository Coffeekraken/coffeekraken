import __getTranslateProperties from '../style/getTranslateProperties';
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
        const translate = __getTranslateProperties($elmMatrix);
        expect(translate).toEqual({
            x: 10,
            y: 20,
            z: 0
        });
    });
    it('Should get the translate properties from a matrix3d css declaration', () => {
        const translate = __getTranslateProperties($elmMatrix3d);
        expect(translate).toEqual({
            x: 10,
            y: 20,
            z: 30
        });
    });
    it('Should get the translate properties from a translate3d css declaration', () => {
        const translate = __getTranslateProperties($elmtranslate3d);
        expect(translate).toEqual({
            x: 12,
            y: '50%',
            z: 48
        });
    });
    it('Should get the translate properties from a translate css declaration', () => {
        const translate = __getTranslateProperties($elmTranslate);
        expect(translate).toEqual({
            x: 20,
            y: 32,
            z: 0
        });
    });
    it('Should get the translate properties from a default translateX, translateY and translateZ css declaration', () => {
        const translate = __getTranslateProperties($elmDefault);
        expect(translate).toEqual({
            x: 48,
            y: 10,
            z: '20%'
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sd0JBQXdCLE1BQU0saUNBQWlDLENBQUM7QUFFdkUsUUFBUSxDQUFDLHFDQUFxQyxFQUFFLEdBQUcsRUFBRTtJQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCekIsQ0FBQztJQUNGLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM3RCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakUsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNuRSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFL0QsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLEdBQUcsRUFBRTtRQUMzRSxNQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFFQUFxRSxFQUFFLEdBQUcsRUFBRTtRQUM3RSxNQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtTQUNOLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdFQUF3RSxFQUFFLEdBQUcsRUFBRTtRQUNoRixNQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1RCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEtBQUs7WUFDUixDQUFDLEVBQUUsRUFBRTtTQUNOLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHNFQUFzRSxFQUFFLEdBQUcsRUFBRTtRQUM5RSxNQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBHQUEwRyxFQUFFLEdBQUcsRUFBRTtRQUNsSCxNQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsS0FBSztTQUNULENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==