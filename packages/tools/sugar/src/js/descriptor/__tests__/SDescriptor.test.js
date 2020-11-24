import SDescriptor from '../SDescriptor';

describe('sugar.js.convert.toHtml', () => {
  it('Should have resolved the 1 log promise correctly', (done) => {
    class MyDescriptor extends SDescriptor {
      static rules = {
        myProperty: {
          type: 'String',
          required: true,
          default: 'Hello'
        }
      };
      static type = 'Object';
    }

    const res = MyDescriptor.apply({
      myProperty: null,
      another: 'Plop'
    });

    expect(res).toBe(true);

    done();
  });
});
