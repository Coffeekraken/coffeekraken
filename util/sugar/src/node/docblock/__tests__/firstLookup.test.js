const __firstLookup = require('../firstLookup');
describe('sugar.node.docblock.firstLookup', () => {
  it('Should search and extract the first docblock correctly', async (done) => {
    const firstLookup = await __firstLookup(`${__dirname}/doc`);

    expect(firstLookup['sugar.some.thing.something']).toEqual({
      name: 'something',
      namespace: 'sugar.some.thing',
      description: 'This is something',
      param: {
        param1: {
          name: 'param1',
          type: 'Object',
          description: 'This is the parameter 1',
          default: undefined
        },
        param2: {
          name: 'param2',
          type: 'Number',
          description: 'This is the parameter 2',
          default: 10
        }
      },
      since: '2.0.0',
      author: {
        name: 'Olivier Bossel',
        email: 'olivier.bossel@gmail.com',
        website: 'https://olivierbossel.com'
      },
      path: 'somethinf.md'
    });
    expect(firstLookup['sugar.other.thing.coco.otherThing']).toEqual({
      name: 'otherThing',
      namespace: 'sugar.other.thing.coco',
      description: 'This is another thing',
      param: {
        param1: {
          name: 'param1',
          type: 'Object',
          description: 'This is the parameter 1',
          default: undefined
        },
        param2: {
          name: 'param2',
          type: 'Number',
          description: 'This is the parameter 2',
          default: 10
        }
      },
      since: '2.0.0',
      author: {
        name: 'Olivier Bossel',
        email: 'olivier.bossel@gmail.com',
        website: 'https://olivierbossel.com'
      },
      path: 'child/other.md'
    });

    done();
  });
});
