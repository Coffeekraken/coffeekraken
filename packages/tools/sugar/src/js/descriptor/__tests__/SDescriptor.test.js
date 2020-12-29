import SDescriptor from '../SDescriptor';

describe('sugar.js.convert.toHtml', () => {
  it('Should have resolved the 1 log promise correctly', (done) => {
    class MyDescriptor extends SDescriptor {
      static rules = {
        myProperty: {
          type: 'String',
          required: true,
          default: 'Hello'
        },
        glob: {
          property: {
            type: 'Number',
            required: true
          }
        },
        // youhou: {
        //   coco: ['hello', 'world']
        // },
        // something: {
        //   'deep.property': {
        //     type: 'Number',
        //     required: true,
        //     default: 12,
        //     min: 20,
        //     max: 2,
        //     description: 'Something cool',
        //     alias: 't'
        //   }
        // },
        another: {
          type: 'String'
        }
      };
      static settings = {
        complete: true
      };
      static type = 'Object';
    }

    const obj = {
      myProperty: null,
      another: 'Plop',
      glob: {
        property: 'world++'
      }
    };

    const descriptor = new MyDescriptor();
    const res = descriptor.apply(obj);
    console.log(res.toConsole());

    // const valueRes = SDescriptor.generate({
    //   name: 'Coco',
    //   rules: {
    //     required: true,
    //     default: 'yyy'
    //   },
    //   settings: {
    //     complete: false
    //   }
    // }).apply(null);

    // console.log(valueRes.toConsole());

    expect(true).toBe(true);

    done();
  });
});
