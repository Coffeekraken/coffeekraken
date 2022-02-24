import __stripDocblocks from '../stripDocblocks';
describe('sugar.shared.string.stripDocblocks', () => {
    it('Should remove all docblocks correctly', () => {
        const txt = `
            /**
             * @name            something
             * 
             * Hello world
             * 
             * @param       {String}            something           Hello world
             * 
             * @since       2.0.0
              * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */

            Hello world
        
        `;
        const res = __stripDocblocks(txt);
        expect(res.match(/\/\*\*/)).toBeNull();
    });
});
