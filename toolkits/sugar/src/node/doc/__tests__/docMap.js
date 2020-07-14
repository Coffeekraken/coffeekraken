module.exports = (__docMap) => {
  describe('sugar.node.doc.docMap', () => {
    it('Should parse correctly the passed folder to search for @namespace tags', async (done) => {
      const docMap = await __docMap(`${__dirname}/doc`);

      expect(docMap).toEqual({
        flat: {
          'sugar.cool.thing.coco': {
            path: 'somethinf.md',
            name: 'coco',
            filename: 'somethinf.md',
            title: 'Something',
            namespace: 'sugar.cool.thing'
          },
          'something.cool.and.child.other': {
            path: 'child/other.md',
            name: 'other',
            filename: 'other.md',
            title: 'Other thing',
            namespace: 'something.cool.and.child'
          }
        },
        tree: {
          something: {
            cool: {
              and: {
                child: {
                  other: {
                    filename: 'other.md',
                    name: 'other',
                    namespace: 'something.cool.and.child',
                    path: 'child/other.md',
                    title: 'Other thing'
                  }
                }
              }
            }
          },
          sugar: {
            cool: {
              thing: {
                coco: {
                  path: 'somethinf.md',
                  name: 'coco',
                  filename: 'somethinf.md',
                  title: 'Something',
                  namespace: 'sugar.cool.thing'
                }
              }
            }
          }
        }
      });

      done();
    });
  });
};
