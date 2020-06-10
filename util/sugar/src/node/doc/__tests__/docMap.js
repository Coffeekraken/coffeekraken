module.exports = (__docMap) => {
  describe('sugar.node.doc.docMap', () => {
    it('Should parse correctly the passed folder to search for @namespace tags', async (done) => {
      const docMap = await __docMap(`${__dirname}/doc`);

      expect(docMap).toEqual({
        flat: {
          'somethinf.md': {
            path: 'somethinf.md',
            filename: 'somethinf.md',
            title: 'Something',
            namespace: 'sugar.cool.thing'
          },
          'child/other.md': {
            path: 'child/other.md',
            filename: 'other.md',
            title: 'Other thing',
            namespace: 'something.cool.and.child'
          }
        },
        tree: {
          'somethinf.md': {
            path: 'somethinf.md',
            filename: 'somethinf.md',
            title: 'Something',
            namespace: 'sugar.cool.thing'
          },
          child: {
            'other.md': {
              filename: 'other.md',
              namespace: 'something.cool.and.child',
              path: 'child/other.md',
              title: 'Other thing'
            }
          }
        }
      });

      done();
    });
  });
};
