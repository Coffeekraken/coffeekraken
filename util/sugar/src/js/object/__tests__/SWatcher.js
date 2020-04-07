module.exports = (__SWatcher) => {

  const obj = {
    a: 'hello',
    b: {
      bb: 'world'
    },
    c: {
      cc: {
        ccc: ['hello', 'world']
      }
    }
  };

  const watcher = new __SWatcher(obj);

  test('Assign a new value', done => {
    // watcher.c.cc.ccc = 'world';
    watcher.c.cc.ccc.push('coco');
    done();
  });

}