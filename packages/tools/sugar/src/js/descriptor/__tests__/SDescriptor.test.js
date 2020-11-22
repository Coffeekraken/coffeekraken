import SDescriptor from '../SDescriptor';
describe('sugar.js.convert.toHtml', () => {
    class MyDescriptor extends SDescriptor {
    }
    MyDescriptor.rules = {
        myProperty: {
            type: 'String',
            required: true,
            default: 'Hello'
        }
    };
    const res = MyDescriptor.apply({
        myProperty: null,
        another: 'Plop'
    });
    expect(res).toBe(true);
});
