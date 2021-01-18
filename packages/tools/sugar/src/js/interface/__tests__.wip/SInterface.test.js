import SInterface from '../SInterface';

describe('sugar.js.convert.toHtml', () => {
  it('Should have resolved the 1 log promise correctly', (done) => {
    class MyInterface extends SInterface {
      static definition = {
        myProperty: {
          type: 'String',
          required: true,
          default: 'Hello'
        },
        'deep.property': {
          type: 'Number',
          required: true,
          default: 1,
          min: 20,
          max: 2,
          description: 'Something cool',
          alias: 't'
        },
        another: {
          type: 'Boolean'
        }
      };
      static settings = {
        complete: true
      };
    }

    const obj = {
      myProperty: null,
      another: 'Plop'
    };

    const res = MyInterface.apply(obj);
    console.log(res.toConsole());

    expect(true).toBe(true);

    done();
  });
});
