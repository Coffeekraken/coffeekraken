module.exports = (__watch) => {

  let obj = {
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

  let doneAssign, doneUpdating, doneUpdatingDeep, doneDeleting, doneAddIntoArray;

  let hasUnwatchedObjectBeenWatched = false;

  const watchObj = __watch(obj, '**', (obj) => {
    if (obj.action === 'Object.set' && obj.path === 'coco' && watchObj.coco === 'plop') {
      doneAssign();
    } else if (obj.path === 'a' && watchObj.a === 'bonjours') {
      doneUpdating();
    } else if (obj.path === 'b.bb' && watchObj.b.bb === 'hola') {
      doneUpdatingDeep();
    } else if (obj.action === 'Object.delete' && !watchObj.b.bb) {
      doneDeleting();
    } else if (obj.action === 'Array.push') {
      expect(watchObj.c.cc.ccc).toEqual(['hello', 'world', 'plop']);
      doneAddIntoArray();
    } else if (obj.path === 'b.plop' && watchObj.b.plop === 'yop') {
      console.log(obj);
      hasUnwatchedObjectBeenWatched = true;
    }
  });

  test('Assign a new value', done => {
    doneAssign = done;
    watchObj.coco = 'plop';
  });

  test('Update an existing value', done => {
    doneUpdating = done;
    watchObj.a = 'bonjours';
  });

  test('Update an existing deep value', done => {
    doneUpdatingDeep = done;
    watchObj.b.bb = 'hola';
  });

  test('Deleting a deep value', done => {
    doneDeleting = done;
    delete watchObj.b.bb;
  });

  test('Adding a value into an array using push', done => {
    doneAddIntoArray = done;
    watchObj.c.cc.ccc.push('plop');
  });

  test('Unwatch the object', done => {
    watchObj.unwatch();
    watchObj.b.plop = 'yop';
    setTimeout(() => {
      expect(hasUnwatchedObjectBeenWatched).toBe(false);
      done();
    })
  });

}